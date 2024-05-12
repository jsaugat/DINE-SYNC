export const verifyAdmin = (req, res, next) => {
  const query = req.query;
  const isAdmin = query.isAdmin === "true";

  if (isAdmin) {
    // User is an admin, proceed to the next middleware or controller function
    return next();
  } else {
    // User is not an admin, return unauthorized error
    return res.status(403).json({ error: "Unauthorized access" });
  }
};
