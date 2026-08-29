import * as orderRepository from "../repositories/orderRepository.js";

export const getOrders = () => {
  return orderRepository.getOrders();
};

export const getOrderById = (id: number) => {
  const orders = orderRepository.getOrders();

  return orders.find(
    (order) => order.id === id
  );
};