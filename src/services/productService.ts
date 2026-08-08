import * as productRepository from "../repositories/productRepository.js";

export const getProducts = () => {
  return productRepository.getAllProducts();
};

export const getProduct = (id: number) => {
  return productRepository.getProductById(id);
};

export const createProduct = (name: string, price: number) => {
  const products = productRepository.getAllProducts();

  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  productRepository.createProduct(newProduct);

  return newProduct;
};

export const updateProduct = (
  id: number,
  name: string,
  price: number
) => {
  return productRepository.updateProduct(id, {
    name,
    price,
  });
};

export const deleteProduct = (id: number) => {
  productRepository.deleteProduct(id);
};