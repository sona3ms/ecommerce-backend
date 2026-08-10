import { Router } from "express";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

const router = Router();

router.get("/", getAddresses);

router.post("/", addAddress);

router.put("/:id", updateAddress);

router.delete("/:id", deleteAddress);

export default router;