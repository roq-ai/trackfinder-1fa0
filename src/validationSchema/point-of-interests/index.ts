import * as yup from 'yup';

export const pointOfInterestValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  route_id: yup.string().nullable(),
});
