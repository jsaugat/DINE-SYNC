import express from "express";
import {
  reserveTable,
  getMyOrders,
  deleteOrder,
} from "../controllers/reservation.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
//! make use of validateToken please XD

const router = express.Router();

// RESERVATION
router.post("/", reserveTable);
// MY ORDERS
router.get("/myorders", getMyOrders);
router.delete("/myorders/:orderId", deleteOrder);

export default router;
