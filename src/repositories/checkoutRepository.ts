import { orders } from "../data/orders.js";
import type { Order } from "../types/order.js";

export const createOrder = (order: Order) => {
  orders.push(order);
  return order;
};

export const getOrders = () => {
  return orders;
};