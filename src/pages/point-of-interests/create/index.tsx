import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPointOfInterest } from 'apiSdk/point-of-interests';
import { Error } from 'components/error';
import { pointOfInterestValidationSchema } from 'validationSchema/point-of-interests';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { RouteInterface } from 'interfaces/route';
import { getRoutes } from 'apiSdk/routes';
import { PointOfInterestInterface } from 'interfaces/point-of-interest';

function PointOfInterestCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PointOfInterestInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPointOfInterest(values);
      resetForm();
      router.push('/point-of-interests');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PointOfInterestInterface>({
    initialValues: {
      name: '',
      description: '',
      route_id: (router.query.route_id as string) ?? null,
    },
    validationSchema: pointOfInterestValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Point Of Interest
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<RouteInterface>
            formik={formik}
            name={'route_id'}
            label={'Select Route'}
            placeholder={'Select Route'}
            fetcher={getRoutes}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'point_of_interest',
    operation: AccessOperationEnum.CREATE,
  }),
)(PointOfInterestCreatePage);
