class CustomAPIError extends Error {
  constructor(errMsg, statusCode) {
    super(errMsg);
    this.statusCode = statusCode;
  }
}

export const createCustomError = (errMsg, statusCode) => {
  return new CustomAPIError(errMsg, statusCode);
};
