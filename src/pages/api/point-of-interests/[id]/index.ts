import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { pointOfInterestValidationSchema } from 'validationSchema/point-of-interests';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.point_of_interest
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPointOfInterestById();
    case 'PUT':
      return updatePointOfInterestById();
    case 'DELETE':
      return deletePointOfInterestById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPointOfInterestById() {
    const data = await prisma.point_of_interest.findFirst(convertQueryToPrismaUtil(req.query, 'point_of_interest'));
    return res.status(200).json(data);
  }

  async function updatePointOfInterestById() {
    await pointOfInterestValidationSchema.validate(req.body);
    const data = await prisma.point_of_interest.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePointOfInterestById() {
    const data = await prisma.point_of_interest.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
