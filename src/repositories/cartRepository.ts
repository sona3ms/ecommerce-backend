import { cart } from "../data/carts.js";
import type { CartItem } from "../types/cart.js";

export const getCart = () => {
  return cart;
};

export const findItem = (productId: number) => {
  return cart.items.find(
    (item) => item.productId === productId
  );
};

export const addItem = (item: CartItem) => {
  cart.items.push(item);
};

export const removeItem = (productId: number) => {
  cart.items = cart.items.filter(
    (item) => item.productId !== productId
  );
};

export const updateQuantity = (
  productId: number,
  quantity: number
) => {
  const item = findItem(productId);

  if (item) {
    item.quantity = quantity;
  }

  return item;
};

export const updateSubtotal = (
  subtotal: number
) => {
  cart.subtotal = subtotal;
};

export const updateCoupon = (
  couponCode: string,
  discount: number
) => {
  cart.couponCode = couponCode;
  cart.discount = discount;
};

export const clearCoupon = () => {
  delete cart.couponCode;
  cart.discount = 0;
};