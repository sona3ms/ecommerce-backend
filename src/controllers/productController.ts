import type { Request, Response } from "express";

let products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 85000,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    price: 72000,
  },
];

// GET /products
export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

// GET /products/:id
export const getProductById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

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

  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};

// PUT /products/:id
export const updateProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { name, price } = req.body;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.name = name;
  product.price = price;

  res.json(product);
};

// DELETE /products/:id
export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  products = products.filter((p) => p.id !== id);

  res.json({
    message: "Product deleted successfully",
  });
};