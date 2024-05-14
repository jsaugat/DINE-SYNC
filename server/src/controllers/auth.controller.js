import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/**
 *  @desc    Auth user & get token
 *  @route   POST /api/auth
 *  @access  Public
 */
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body; // login form
  const user = await User.findOne({ email });
  // if (user exists and password matches)
  if (user && (await user.passwordMatches(password))) {
    const token = generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      reservations: user.reservations,
      token,
    });
  } else {
    res.status(401);
    throw Error("Invalid email or password!");
  }
});

/**
 * @desc    Register a new user
 * @route   POST /api/users/
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body; // signup form
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw Error("User already exists");
  }
  const user = await User.create({ name, email, password });
  // if user is successfully created
  if (user) {
    // generate jwt and set a cookie using it
    const token = generateToken(res, user._id);
    // send json response with user data
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      reservations: user.reservations,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc    Logout user
 * @route   POST /api/users/logout
 * @access  Public
 */
const logoutUser = asyncHandler(async (req, res, next) => {
  // this code clears or deletes a cookie named "jwt" by setting an empty value and an expiration date in the past. This effectively removes the cookie from the client's browser.
  res.clearCookie("jwt");
  res.status(200).json({ message: "User logged out" });
});

/**
 * @desc    Get user profile
 * @route   POST /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res, next) => {
  const { _id, name, email } = req.user; // from shield
  res.status(200).json({ _id, name, email });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res, next) => {
  // req.user doesn't include password property so following approach is better for updateUserProfile -->
  const { _id } = req.user; // from shield from authUser controller
  const { name, email, password } = req.body; // from react form
  const user = await User.findById(_id);
  if (user) {
    user.name = name || user.name; // if name is not provided, use the existing name
    user.email = email || user.email; // if email is not provided, use the existing email

    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

/**
 * Side-Note :
 * Using user.password = password || user.password would set the user's password to user.password if password is falsy (empty or not provided), potentially leading to undesired behavior. By checking explicitly with if (password), you ensure that the password is only updated when a new non-empty password is provided in the request.
 */
