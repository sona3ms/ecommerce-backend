import { pool } from "../config/database.js";

import type {
  Cart,
  CartItem,
} from "../types/cart.js";

const getOrCreateCartId = async (
  userId: number
): Promise<number> => {
  const existing = await pool.query(
    `
    SELECT id
    FROM carts
    WHERE user_id = $1
    `,
    [userId]
  );

  if (existing.rows[0]) {
    return Number(existing.rows[0].id);
  }

  const result = await pool.query(
    `
    INSERT INTO carts (user_id)
    VALUES ($1)
    RETURNING id
    `,
    [userId]
  );

  return Number(result.rows[0].id);
};

export const getCart = async (
  userId: number
): Promise<Cart> => {
  const cartId =
    await getOrCreateCartId(userId);

  const cartResult = await pool.query(
    `
    SELECT
      subtotal,
      coupon_code AS "couponCode",
      discount
    FROM carts
    WHERE id = $1
    `,
    [cartId]
  );

  const itemsResult = await pool.query(
    `
    SELECT
      product_id AS "productId",
      name,
      price,
      quantity
    FROM cart_items
    WHERE cart_id = $1
    ORDER BY id
    `,
    [cartId]
  );

  return {
    items: itemsResult.rows,
    subtotal: Number(
      cartResult.rows[0].subtotal
    ),
    ...(cartResult.rows[0].couponCode
      ? {
          couponCode:
            cartResult.rows[0].couponCode,
        }
      : {}),
    discount: Number(
      cartResult.rows[0].discount
    ),
  };
};

export const findItem = async (
  userId: number,
  productId: number
): Promise<CartItem | undefined> => {
  const cartId =
    await getOrCreateCartId(userId);

  const result = await pool.query(
    `
    SELECT
      product_id AS "productId",
      name,
      price,
      quantity
    FROM cart_items
    WHERE cart_id = $1
      AND product_id = $2
    `,
    [cartId, productId]
  );

  return result.rows[0];
};

export const addItem = async (
  userId: number,
  item: CartItem
): Promise<CartItem> => {
  const cartId =
    await getOrCreateCartId(userId);

  const result = await pool.query(
    `
    INSERT INTO cart_items (
      cart_id,
      product_id,
      name,
      price,
      quantity
    )
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (cart_id, product_id)
    DO UPDATE SET
      quantity =
        cart_items.quantity + EXCLUDED.quantity
    RETURNING
      product_id AS "productId",
      name,
      price,
      quantity
    `,
    [
      cartId,
      item.productId,
      item.name,
      item.price,
      item.quantity,
    ]
  );

  return result.rows[0];
};

export const removeItem = async (
  userId: number,
  productId: number
) => {
  const cartId =
    await getOrCreateCartId(userId);

  await pool.query(
    `
    DELETE FROM cart_items
    WHERE cart_id = $1
      AND product_id = $2
    `,
    [cartId, productId]
  );
};

export const updateQuantity = async (
  userId: number,
  productId: number,
  quantity: number
): Promise<CartItem | undefined> => {
  const cartId =
    await getOrCreateCartId(userId);

  const result = await pool.query(
    `
    UPDATE cart_items
    SET quantity = $1
    WHERE cart_id = $2
      AND product_id = $3
    RETURNING
      product_id AS "productId",
      name,
      price,
      quantity
    `,
    [
      quantity,
      cartId,
      productId,
    ]
  );

  return result.rows[0];
};

export const updateSubtotal = async (
  userId: number,
  subtotal: number
) => {
  const cartId =
    await getOrCreateCartId(userId);

  await pool.query(
    `
    UPDATE carts
    SET subtotal = $1
    WHERE id = $2
    `,
    [subtotal, cartId]
  );
};

export const updateCoupon = async (
  userId: number,
  couponCode: string,
  discount: number
) => {
  const cartId =
    await getOrCreateCartId(userId);

  await pool.query(
    `
    UPDATE carts
    SET
      coupon_code = $1,
      discount = $2
    WHERE id = $3
    `,
    [
      couponCode,
      discount,
      cartId,
    ]
  );
};

export const clearCoupon = async (
  userId: number
) => {
  const cartId =
    await getOrCreateCartId(userId);

  await pool.query(
    `
    UPDATE carts
    SET
      coupon_code = NULL,
      discount = 0
    WHERE id = $1
    `,
    [cartId]
  );
};

export const clearCart = async (
  userId: number
) => {
  const cartId =
    await getOrCreateCartId(userId);

  await pool.query(
    `
    DELETE FROM cart_items
    WHERE cart_id = $1
    `,
    [cartId]
  );

  await pool.query(
    `
    UPDATE carts
    SET
      subtotal = 0,
      coupon_code = NULL,
      discount = 0
    WHERE id = $1
    `,
    [cartId]
  );
};