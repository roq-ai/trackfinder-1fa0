import * as yup from 'yup';

export const routeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  trekker_id: yup.string().nullable(),
});
