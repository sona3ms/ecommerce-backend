import { Router } from "express";
import { applyCoupon } from "../controllers/couponController.js";

const router = Router();

router.post("/", applyCoupon);

export default router;