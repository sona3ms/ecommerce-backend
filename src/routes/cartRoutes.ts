import { Router } from "express";

import {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
} from "../controllers/cartController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getCart
);

router.post(
  "/add",
  authenticate,
  addToCart
);

router.put(
  "/:productId",
  authenticate,
  updateQuantity
);

router.delete(
  "/:productId",
  authenticate,
  removeItem
);

export default router;