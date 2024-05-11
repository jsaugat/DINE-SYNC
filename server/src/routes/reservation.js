import express from "express";
import {
  reserveTable,
  getMyOrders,
  // deleteOrder,
} from "../controllers/reservation.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// RESERVATION
router.post("/", reserveTable);
// MY ORDERS
router.get("/myorders", getMyOrders);
// router.delete("/myorders/:id", validateToken, deleteOrder);

export default router;
