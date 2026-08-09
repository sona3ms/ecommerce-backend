import type { Request, Response } from "express";
import * as cartService from "../services/cartService.js";

export const getCart = (req: Request, res: Response) => {
  res.json(cartService.getCart());
};

export const addToCart = (req: Request, res: Response) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      message: "Product ID is required",
    });
  }

  const result = cartService.addToCart(productId);

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

export const updateQuantity = (req: Request, res: Response) => {
  const productId = Number(req.params.productId);
  const { quantity } = req.body;

  const result = cartService.updateQuantity(productId, quantity);

  if (!result.success) {
    return res.status(404).json({
      message: result.message,
    });
  }

  return res.json(result);
};

export const removeItem = (req: Request, res: Response) => {
  const productId = Number(req.params.productId);

  const result = cartService.removeItem(productId);

  return res.json(result);
};