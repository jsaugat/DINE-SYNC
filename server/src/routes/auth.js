import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/auth.controller.js";
import { sendEmail } from "../controllers/email.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = express.Router();

router.post("/", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(validateToken, getUserProfile)
  .put(validateToken, updateUserProfile);
router.post("/send-email", sendEmail);

export default router;
