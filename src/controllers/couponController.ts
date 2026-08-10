import type { Request, Response } from "express";
import * as couponService from "../services/couponService.js";

export const applyCoupon = (
  req: Request,
  res: Response
) => {
  const { code } = req.body;

  const result = couponService.applyCoupon(code);

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.json(result);
};