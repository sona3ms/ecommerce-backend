import { orders } from "../data/orders.js";
import type { Order } from "../types/order.js";

export const createOrder = (order: Order) => {
  orders.push(order);

  return order;
};

export const getOrders = () => {
  return orders;
};

export const getOrderById = (id: number) => {
  return orders.find((order) => order.id === id);
};