import * as cartRepository from "../repositories/cartRepository.js";

export const applyCoupon = (code: string) => {
  const cart = cartRepository.getCart();

  if (code !== "SAVE10") {
    return {
      success: false,
      message: "Invalid coupon",
    };
  }

  const discount = cart.subtotal * 0.1;

  return {
    success: true,
    coupon: code,
    discount,
    total: cart.subtotal - discount,
  };
};