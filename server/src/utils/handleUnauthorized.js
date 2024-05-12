export const handleUnauthorized = (res, message) => {
  res.status(401);
  throw new Error(`Unauthorized: ${message}`);
};
