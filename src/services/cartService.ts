import * as cartRepository from "../repositories/cartRepository.js";
import * as productRepository from "../repositories/productRepository.js";

const calculateSubtotal = () => {
  const cart = cartRepository.getCart();

  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartRepository.updateSubtotal(subtotal);
};

export const getCart = () => {
  return cartRepository.getCart();
};

export const addToCart = (productId: number) => {
  const product = productRepository.getProductById(productId);

  if (!product) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  const existingItem = cartRepository.findItem(productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartRepository.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  calculateSubtotal();

  return {
    success: true,
    cart: cartRepository.getCart(),
  };
};

export const updateQuantity = (
  productId: number,
  quantity: number
) => {
  const item = cartRepository.updateQuantity(
    productId,
    quantity
  );

  if (!item) {
    return {
      success: false,
      message: "Product not found in cart",
    };
  }

  calculateSubtotal();

  return {
    success: true,
    cart: cartRepository.getCart(),
  };
};

export const removeItem = (productId: number) => {
  cartRepository.removeItem(productId);

  calculateSubtotal();

  return {
    success: true,
    cart: cartRepository.getCart(),
  };
};