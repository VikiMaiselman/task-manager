export const errorHandler = (error, req, res, next) => {
  console.error(error?.message);
  return res
    .status(error?.status || 500)
    .json({ error: error?.message ?? "Something went wrong." });
};
