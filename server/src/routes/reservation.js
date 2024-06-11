import express from "express";
import {
  reserveTable,
  getMyOrders,
  getAllOrders,
  deleteOrder,
  deleteOrderById,
} from "../controllers/reservation.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
//! make use of validateToken please XD

const router = express.Router();

// RESERVATION
router.post("/", reserveTable);
// MY ORDERS
router.get("/myorders", getMyOrders);
router.get("/orders", getAllOrders);
router.delete("/myorders/:orderId", deleteOrder);
router.delete("/orders/:orderId", deleteOrderById);

export default router;
