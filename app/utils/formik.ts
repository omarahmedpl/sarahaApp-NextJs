import { useFormik } from "formik";

export const createFormikConfig = (initialValues, validationSchema, onSubmit) => {
  return useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};
