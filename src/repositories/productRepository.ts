import { pool } from "../config/database.js";

import type { Product } from "../types/product.js";

export const getAllProducts = async (): Promise<Product[]> => {
  const result = await pool.query(
    `
    SELECT id, name, price
    FROM products
    ORDER BY id
    `
  );

  return result.rows;
};

export const getProductById = async (
  id: number
): Promise<Product | undefined> => {
  const result = await pool.query(
    `
    SELECT id, name, price
    FROM products
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

export const createProduct = async (
  product: Product
): Promise<Product> => {
  const result = await pool.query(
    `
    INSERT INTO products (
      id,
      name,
      price
    )
    VALUES ($1, $2, $3)
    RETURNING id, name, price
    `,
    [
      product.id,
      product.name,
      product.price,
    ]
  );

  return result.rows[0];
};

export const updateProduct = async (
  id: number,
  updatedProduct: Partial<Product>
): Promise<Product | null> => {
  const current = await getProductById(id);

  if (!current) {
    return null;
  }

  const name =
    updatedProduct.name ?? current.name;

  const price =
    updatedProduct.price ?? current.price;

  const result = await pool.query(
    `
    UPDATE products
    SET name = $1,
        price = $2
    WHERE id = $3
    RETURNING id, name, price
    `,
    [name, price, id]
  );

  return result.rows[0] ?? null;
};

export const deleteProduct = async (
  id: number
): Promise<boolean> => {
  const result = await pool.query(
    `
    DELETE FROM products
    WHERE id = $1
    `,
    [id]
  );

  return result.rowCount === 1;
};