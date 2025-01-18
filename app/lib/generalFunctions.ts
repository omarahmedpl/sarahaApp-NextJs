export const getErrorMessage = (errors : any[] , field: string) => {
  const error = errors.find((err) => err.field === field);
  return error ? error.message : "";
};