import type { Request, Response } from "express";

import * as productService from "../services/productService.js";

// GET /products
export const getProducts = async (
  req: Request,
  res: Response
) => {
  const products =
    await productService.getProducts();

  res.json(products);
};

// GET /products/:id
export const getProductById = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const product =
    await productService.getProduct(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
};

// POST /products
export const createProduct = async (
  req: Request,
  res: Response
) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      message: "Name and price are required",
    });
  }

  const newProduct =
    await productService.createProduct(
      name,
      Number(price)
    );

  res.status(201).json(newProduct);
};

// PUT /products/:id
export const updateProduct = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      message: "Name and price are required",
    });
  }

  const updatedProduct =
    await productService.updateProduct(
      id,
      name,
      Number(price)
    );

  if (!updatedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(updatedProduct);
};

// DELETE /products/:id
export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const deleted =
    await productService.deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json({
    message: "Product deleted successfully",
  });
};