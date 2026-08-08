import type { Request, Response } from "express";
import * as productService from "../services/productService.js";

// GET /products
export const getProducts = (req: Request, res: Response) => {
  const products = productService.getProducts();
  res.json(products);
};

// GET /products/:id
export const getProductById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const product = productService.getProduct(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
};

// POST /products
export const createProduct = (req: Request, res: Response) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Name and price are required",
    });
  }

  const newProduct = productService.createProduct(name, price);

  res.status(201).json(newProduct);
};

// PUT /products/:id
export const updateProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;

  const updatedProduct = productService.updateProduct(id, name, price);

  if (!updatedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(updatedProduct);
};

// DELETE /products/:id
export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  productService.deleteProduct(id);

  res.json({
    message: "Product deleted successfully",
  });
};