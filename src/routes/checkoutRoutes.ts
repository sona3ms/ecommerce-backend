import { Router } from "express";

import { checkout } from "../controllers/checkoutController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  checkout
);

export default router;