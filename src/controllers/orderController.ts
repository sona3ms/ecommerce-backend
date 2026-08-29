import type { Request, Response } from "express";

import * as orderService from "../services/orderService.js";

export const getOrders = (
  req: Request,
  res: Response
) => {
  const orders = orderService.getOrders();

  return res.json(orders);
};

export const getOrderById = (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const order =
    orderService.getOrderById(id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  return res.json(order);
};