import { pool } from "../config/database.js";
import type { Address } from "../types/address.js";

export const getAddresses = async (
  userId: number
): Promise<Address[]> => {
  const result = await pool.query(
    `
    SELECT
      id,
      user_id AS "userId",
      full_name AS "fullName",
      phone,
      house,
      street,
      city,
      state,
      pincode
    FROM addresses
    WHERE user_id = $1
    ORDER BY id
    `,
    [userId]
  );

  return result.rows;
};

export const getAddressById = async (
  id: number,
  userId: number
): Promise<Address | undefined> => {
  const result = await pool.query(
    `
    SELECT
      id,
      user_id AS "userId",
      full_name AS "fullName",
      phone,
      house,
      street,
      city,
      state,
      pincode
    FROM addresses
    WHERE id = $1
      AND user_id = $2
    `,
    [id, userId]
  );

  return result.rows[0];
};

export const addAddress = async (
  address: Address
): Promise<Address> => {
  const result = await pool.query(
    `
    INSERT INTO addresses (
      id,
      user_id,
      full_name,
      phone,
      house,
      street,
      city,
      state,
      pincode
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9
    )
    RETURNING
      id,
      user_id AS "userId",
      full_name AS "fullName",
      phone,
      house,
      street,
      city,
      state,
      pincode
    `,
    [
      address.id,
      address.userId,
      address.fullName,
      address.phone,
      address.house,
      address.street,
      address.city,
      address.state,
      address.pincode,
    ]
  );

  return result.rows[0];
};

export const updateAddress = async (
  id: number,
  userId: number,
  updated: Partial<Address>
): Promise<Address | null> => {
  const current =
    await getAddressById(id, userId);

  if (!current) {
    return null;
  }

  const result = await pool.query(
    `
    UPDATE addresses
    SET
      full_name = $1,
      phone = $2,
      house = $3,
      street = $4,
      city = $5,
      state = $6,
      pincode = $7
    WHERE id = $8
      AND user_id = $9
    RETURNING
      id,
      user_id AS "userId",
      full_name AS "fullName",
      phone,
      house,
      street,
      city,
      state,
      pincode
    `,
    [
      updated.fullName ?? current.fullName,
      updated.phone ?? current.phone,
      updated.house ?? current.house,
      updated.street ?? current.street,
      updated.city ?? current.city,
      updated.state ?? current.state,
      updated.pincode ?? current.pincode,
      id,
      userId,
    ]
  );

  return result.rows[0] ?? null;
};

export const deleteAddress = async (
  id: number,
  userId: number
): Promise<boolean> => {
  const result = await pool.query(
    `
    DELETE FROM addresses
    WHERE id = $1
      AND user_id = $2
    `,
    [id, userId]
  );

  return result.rowCount === 1;
};