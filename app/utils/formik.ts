import { useFormik } from "formik";

export const CreateFormikConfig = (initialValues, validationSchema, onSubmit) => {
  return useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};
