import * as cartRepository from "../repositories/cartRepository.js";
import * as addressRepository from "../repositories/addressRepository.js";
import * as orderRepository from "../repositories/orderRepository.js";

import type { Order } from "../types/order.js";

export const checkout = async (
  userId: number,
  addressId: number,
  couponCode?: string
) => {
  const cart =
    await cartRepository.getCart(userId);

  // Check cart
  if (cart.items.length === 0) {
    return {
      success: false,
      message: "Cart is empty",
    };
  }

  // Check address belongs to logged-in user
  const address =
    await addressRepository.getAddressById(
      addressId,
      userId
    );

  if (!address) {
    return {
      success: false,
      message: "Address not found",
    };
  }

  // Calculate subtotal
  const subtotal = cart.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Calculate discount
  let discount = 0;

  if (couponCode) {
    if (
      couponCode.toUpperCase() !== "SAVE10"
    ) {
      return {
        success: false,
        message: "Invalid coupon",
      };
    }

    discount = subtotal * 0.1;
  } else if (cart.discount > 0) {
    // Use discount already stored in the cart
    discount = cart.discount;
  }

  // Delivery is currently free
  const deliveryCharge = 0;

  // Final total
  const total =
    subtotal -
    discount +
    deliveryCharge;

  const order: Order = {
    id: Date.now(),
    userId,
    items: [...cart.items],
    address,
    subtotal,
    discount,
    deliveryCharge,
    total,
    status: "confirmed",
    createdAt: new Date(),
  };

  await orderRepository.createOrder(order);

  // Clear the PostgreSQL cart
  await cartRepository.clearCart(userId);

  return {
    success: true,
    message: "Checkout completed successfully",
    order,
  };
};