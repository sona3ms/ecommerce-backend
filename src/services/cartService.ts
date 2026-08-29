import * as cartRepository from "../repositories/cartRepository.js";
import * as productRepository from "../repositories/productRepository.js";

const calculateSubtotal = async (
  userId: number
) => {
  const cart =
    await cartRepository.getCart(userId);

  const subtotal = cart.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  await cartRepository.updateSubtotal(
    userId,
    subtotal
  );
};

export const getCart = async (
  userId: number
) => {
  return await cartRepository.getCart(
    userId
  );
};

export const addToCart = async (
  userId: number,
  productId: number
) => {
  const product =
    await productRepository.getProductById(
      productId
    );

  if (!product) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  await cartRepository.addItem(
    userId,
    {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    }
  );

  await calculateSubtotal(userId);

  return {
    success: true,
    cart:
      await cartRepository.getCart(userId),
  };
};

export const updateQuantity = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const item =
    await cartRepository.updateQuantity(
      userId,
      productId,
      quantity
    );

  if (!item) {
    return {
      success: false,
      message: "Product not found in cart",
    };
  }

  await calculateSubtotal(userId);

  return {
    success: true,
    cart:
      await cartRepository.getCart(userId),
  };
};

export const removeItem = async (
  userId: number,
  productId: number
) => {
  await cartRepository.removeItem(
    userId,
    productId
  );

  await calculateSubtotal(userId);

  return {
    success: true,
    cart:
      await cartRepository.getCart(userId),
  };
};

export const applyCoupon = async (
  userId: number,
  couponCode: string
) => {
  const cart =
    await cartRepository.getCart(userId);

  if (
    couponCode.toUpperCase() !== "SAVE10"
  ) {
    return {
      success: false,
      message: "Invalid coupon",
    };
  }

  const discount =
    cart.subtotal * 0.1;

  await cartRepository.updateCoupon(
    userId,
    couponCode.toUpperCase(),
    discount
  );

  return {
    success: true,
    cart:
      await cartRepository.getCart(userId),
  };
};

export const clearCoupon = async (
  userId: number
) => {
  await cartRepository.clearCoupon(userId);

  return {
    success: true,
    cart:
      await cartRepository.getCart(userId),
  };
};