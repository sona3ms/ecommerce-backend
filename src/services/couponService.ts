import * as cartRepository from "../repositories/cartRepository.js";

export const applyCoupon = (code: string) => {
  const cart = cartRepository.getCart();

  if (code.toUpperCase() !== "SAVE10") {
    return {
      success: false,
      message: "Invalid coupon",
    };
  }

  const discount = cart.subtotal * 0.1;

  cartRepository.updateCoupon(
    code.toUpperCase(),
    discount
  );

  return {
    success: true,
    coupon: code.toUpperCase(),
    discount,
    total: cart.subtotal - discount,
  };
};