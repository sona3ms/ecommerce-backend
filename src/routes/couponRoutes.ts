import { Router } from "express";

import { applyCoupon } from "../controllers/couponController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  applyCoupon
);

export default router;