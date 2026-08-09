import { Router } from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
} from "../controllers/cartController.js";

const router = Router();

router.get("/", getCart);

router.post("/add", addToCart);

router.put("/:productId", updateQuantity);

router.delete("/:productId", removeItem);

export default router;