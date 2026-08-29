import { Router } from "express";

import {
  getOrders,
  getOrderById,
} from "../controllers/orderController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getOrders
);

router.get(
  "/:id",
  authenticate,
  getOrderById
);

export default router;