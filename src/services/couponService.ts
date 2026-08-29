import * as cartRepository from "../repositories/cartRepository.js";

export const applyCoupon = async (
  userId: number,
  code: string
) => {
  const cart =
    await cartRepository.getCart(userId);

  if (code.toUpperCase() !== "SAVE10") {
    return {
      success: false,
      message: "Invalid coupon",
    };
  }

  const discount = cart.subtotal * 0.1;

  await cartRepository.updateCoupon(
    userId,
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