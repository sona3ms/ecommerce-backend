import { users } from "../data/users.js";
import type { User } from "../types/user.ts";

export const findUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

export const findUserById = (id: number) => {
  return users.find((user) => user.id === id);
};

export const createUser = (user: User) => {
  users.push(user);
  return user;
};

