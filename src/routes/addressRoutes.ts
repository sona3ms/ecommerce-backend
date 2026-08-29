import { Router } from "express";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getAddresses);

router.post("/", authenticate, addAddress);

router.put(
  "/:id",
  authenticate,
  updateAddress
);

router.delete(
  "/:id",
  authenticate,
  deleteAddress
);

export default router;