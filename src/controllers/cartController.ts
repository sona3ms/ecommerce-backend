import type { Request, Response } from "express";

import * as cartService from "../services/cartService.js";

export const getCart = async (
  req: Request,
  res: Response
) => {
  const userId = Number((req as any).user.id);

  const cart =
    await cartService.getCart(userId);

  res.json(cart);
};

export const addToCart = async (
  req: Request,
  res: Response
) => {
  const userId = Number((req as any).user.id);

  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      message: "Product ID is required",
    });
  }

  const result =
    await cartService.addToCart(
      userId,
      Number(productId)
    );

  if (!result.success) {
    return res.status(404).json({
      message: result.message,
    });
  }

  return res.status(200).json({
    message: "Product added to cart successfully",
    cart: result.cart,
  });
};

export const updateQuantity = async (
  req: Request,
  res: Response
) => {
  const userId = Number((req as any).user.id);

  const productId = Number(
    req.params.productId
  );

  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({
      message: "Quantity must be at least 1",
    });
  }

  const result =
    await cartService.updateQuantity(
      userId,
      productId,
      Number(quantity)
    );

  if (!result.success) {
    return res.status(404).json({
      message: result.message,
    });
  }

  return res.json(result);
};

export const removeItem = async (
  req: Request,
  res: Response
) => {
  const userId = Number((req as any).user.id);

  const productId = Number(
    req.params.productId
  );

  const result =
    await cartService.removeItem(
      userId,
      productId
    );

  return res.json(result);
};