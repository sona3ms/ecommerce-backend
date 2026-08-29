import type { Request, Response } from "express";

import * as orderService from "../services/orderService.js";

export const getOrders = async (
  req: Request,
  res: Response
) => {
  const userId = Number(
    (req as any).user.id
  );

  const orders =
    await orderService.getOrders(userId);

  return res.json(orders);
};

export const getOrderById = async (
  req: Request,
  res: Response
) => {
  const userId = Number(
    (req as any).user.id
  );

  const id = Number(req.params.id);

  const order =
    await orderService.getOrderById(
      id,
      userId
    );

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  return res.json(order);
};