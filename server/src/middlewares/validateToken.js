import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { handleUnauthorized } from "../utils/handleUnauthorized.js";

export const validateToken = asyncHandler(async function (req, res, next) {
  // let token = req.cookies.jwt;
  const { authorization } = req.headers;
  console.log("authorization :: ", authorization, "- validateToken midlwr");

  if (authorization) {
    const token = authorization.split(" ")[1];
    console.log("Token :: ", token, "-validateToken midlwr");
    return;
  }

  // if missing token
  if (!token) {
    handleUnauthorized(res, "Missing: token");
  } else {
    try {
      /**
       * @function 'decodedPayload' -
       * if token is valid   @returns an object representing the 'decoded payload of the JWT'
       * if token is invalid @throws  an error that's why wrapped in try-catch block
       */
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); // returns {_id}
      console.log("decodedPayload", decodedPayload._id);
      // retrieve user-info from db based on decoded._id and assign it to a new 'user' prop in req obj.
      // req.user can be utilized by downstream middlwares or route handlers.
      req.user = await User.findById(decodedPayload._id).select("-password");
      next();
    } catch (err) {
      handleUnauthorized(res, err.message || "Invalid token");
    }
  }
});
