import * as cartRepository from "../repositories/cartRepository.js";
import * as addressRepository from "../repositories/addressRepository.js";
import * as orderRepository from "../repositories/orderRepository.js";

import type { Order } from "../types/order.js";

export const checkout = (
  addressId: number,
  couponCode?: string
) => {
  const cart = cartRepository.getCart();

  // Check cart
  if (cart.items.length === 0) {
    return {
      success: false,
      message: "Cart is empty",
    };
  }

  // Check address
  const address =
    addressRepository.getAddressById(addressId);

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
    if (couponCode.toUpperCase() !== "SAVE10") {
      return {
        success: false,
        message: "Invalid coupon",
      };
    }

    discount = subtotal * 0.1;
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

    items: [...cart.items],

    address,

    subtotal,

    discount,

    deliveryCharge,

    total,

    status: "confirmed",

    createdAt: new Date(),
  };

  orderRepository.createOrder(order);

  // Clear cart after successful checkout
 cart.items = [];
cart.subtotal = 0;
cart.discount = 0;

delete cart.couponCode;

  return {
    success: true,
    message: "Checkout completed successfully",
    order,
  };
};