import express from "express";
import {
  reserveTable,
  getMyOrders,
  deleteOrder,
} from "../controllers/reservation.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// RESERVAION
router.post("/", reserveTable);
// MY ORDERS
router
  .route("/myorders")
  .get(validateToken, getMyOrders)
  .delete(validateToken, deleteOrder);

export default router;
