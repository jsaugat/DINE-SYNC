import jwt from "jsonwebtoken";

const generateToken = (res, _id) => {
  //? Signing token : jwt.sign(payload, secret, options)
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //? Setting cookie (key, value, options), set an http cookie named 'jwt'
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS is used only in production
    sameSite: "strict", // prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

export default generateToken;
