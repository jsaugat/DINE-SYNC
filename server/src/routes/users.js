import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

// GET ALL
router.get("/", verifyAdmin, getUsers);
// DELETE
router.delete("/:userId", verifyAdmin, deleteUser);
// GET
// router.get("/:id", verifyUser, getUser);
// UPDATE
// router.put("/:id", verifyUser, updateUser);

export default router;
