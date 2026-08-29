import type { Request, Response } from "express";

import * as checkoutService from "../services/checkoutService.js";

export const checkout = async (
  req: Request,
  res: Response
) => {
  const { addressId, couponCode } = req.body;

  if (!addressId) {
    return res.status(400).json({
      message: "Address ID is required",
    });
  }

  const userId = (req as any).user.id;

  const result =
    await checkoutService.checkout(
      userId,
      Number(addressId),
      couponCode
    );

  if (!result.success) {
    if (
      result.message === "Address not found"
    ) {
      return res.status(404).json(result);
    }

    return res.status(400).json(result);
  }

  return res.status(201).json(result);
};