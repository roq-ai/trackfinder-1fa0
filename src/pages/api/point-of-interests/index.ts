import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { pointOfInterestValidationSchema } from 'validationSchema/point-of-interests';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPointOfInterests();
    case 'POST':
      return createPointOfInterest();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPointOfInterests() {
    const data = await prisma.point_of_interest
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'point_of_interest'));
    return res.status(200).json(data);
  }

  async function createPointOfInterest() {
    await pointOfInterestValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.point_of_interest.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
