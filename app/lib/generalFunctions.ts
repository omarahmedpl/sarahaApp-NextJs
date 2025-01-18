// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (errors : any[] , field: string) => {
  const error = errors.find((err) => err.field === field);
  return error ? error.message : "";
};