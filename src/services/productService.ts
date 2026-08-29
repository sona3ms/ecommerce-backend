import * as productRepository from "../repositories/productRepository.js";

export const getProducts = async () => {
  return await productRepository.getAllProducts();
};

export const getProduct = async (id: number) => {
  return await productRepository.getProductById(id);
};

export const createProduct = async (
  name: string,
  price: number
) => {
  const products =
    await productRepository.getAllProducts();

  const newProduct = {
    id:
      products.length > 0
        ? Math.max(...products.map((p) => p.id)) + 1
        : 1,
    name,
    price,
  };

  return await productRepository.createProduct(
    newProduct
  );
};

export const updateProduct = async (
  id: number,
  name: string,
  price: number
) => {
  return await productRepository.updateProduct(
    id,
    {
      name,
      price,
    }
  );
};

export const deleteProduct = async (
  id: number
) => {
  return await productRepository.deleteProduct(id);
};