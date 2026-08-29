import type { Request, Response } from "express";

import * as couponService from "../services/couponService.js";

export const applyCoupon = async (
  req: Request,
  res: Response
) => {
  const userId = Number(
    (req as any).user.id
  );

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      message: "Coupon code is required",
    });
  }

  const result =
    await couponService.applyCoupon(
      userId,
      code
    );

  if (!result.success) {
    return res.status(400).json(result);
  }

  return res.json(result);
};