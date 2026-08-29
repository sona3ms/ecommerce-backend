import { pool } from "../config/database.js";

import type { User } from "../types/user.js";

export const findUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  const result = await pool.query(
    `
    SELECT id, name, email, password
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
};

export const findUserById = async (
  id: number
): Promise<User | undefined> => {
  const result = await pool.query(
    `
    SELECT id, name, email, password
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

export const createUser = async (
  user: User
): Promise<User> => {
  const result = await pool.query(
    `
    INSERT INTO users (
      id,
      name,
      email,
      password
    )
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, password
    `,
    [
      user.id,
      user.name,
      user.email,
      user.password,
    ]
  );

  return result.rows[0];
};