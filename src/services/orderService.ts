import * as orderRepository from "../repositories/orderRepository.js";

export const getOrders = async (
  userId: number
) => {
  return await orderRepository.getOrders(
    userId
  );
};

export const getOrderById = async (
  id: number,
  userId: number
) => {
  return await orderRepository.getOrderById(
    id,
    userId
  );
};