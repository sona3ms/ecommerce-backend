import { pool } from "../config/database.js";

import type { Order } from "../types/order.js";

export const createOrder = async (
  order: Order
): Promise<Order> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
      INSERT INTO orders (
        id,
        user_id,
        address_id,
        subtotal,
        discount,
        delivery_charge,
        total,
        status,
        created_at
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9
      )
      `,
      [
        order.id,
        order.userId,
        order.address.id,
        order.subtotal,
        order.discount,
        order.deliveryCharge,
        order.total,
        order.status,
        order.createdAt,
      ]
    );

    for (const item of order.items) {
      await client.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          name,
          price,
          quantity
        )
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
          order.id,
          item.productId,
          item.name,
          item.price,
          item.quantity,
        ]
      );
    }

    await client.query("COMMIT");

    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getOrders = async (
  userId: number
): Promise<Order[]> => {
  const ordersResult = await pool.query(
    `
    SELECT
      o.id,
      o.user_id AS "userId",
      o.address_id,
      o.subtotal,
      o.discount,
      o.delivery_charge AS "deliveryCharge",
      o.total,
      o.status,
      o.created_at AS "createdAt",

      a.full_name AS "fullName",
      a.phone,
      a.house,
      a.street,
      a.city,
      a.state,
      a.pincode

    FROM orders o

    JOIN addresses a
      ON o.address_id = a.id

    WHERE o.user_id = $1

    ORDER BY o.created_at DESC
    `,
    [userId]
  );

  const orders: Order[] = [];

  for (const row of ordersResult.rows) {
    const itemsResult = await pool.query(
      `
      SELECT
        product_id AS "productId",
        name,
        price,
        quantity
      FROM order_items
      WHERE order_id = $1
      ORDER BY id
      `,
      [row.id]
    );

    orders.push({
      id: Number(row.id),
      userId: Number(row.userId),

      items: itemsResult.rows.map(
        (item) => ({
          productId: Number(item.productId),
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })
      ),

      address: {
        id: Number(row.address_id),
        userId: userId,
        fullName: row.fullName,
        phone: row.phone,
        house: row.house,
        street: row.street,
        city: row.city,
        state: row.state,
        pincode: row.pincode,
      },

      subtotal: Number(row.subtotal),
      discount: Number(row.discount),
      deliveryCharge: Number(
        row.deliveryCharge
      ),
      total: Number(row.total),
      status: row.status,
      createdAt: row.createdAt,
    });
  }

  return orders;
};

export const getOrderById = async (
  id: number,
  userId: number
): Promise<Order | undefined> => {
  const orders = await getOrders(userId);

  return orders.find(
    (order) => order.id === id
  );
};