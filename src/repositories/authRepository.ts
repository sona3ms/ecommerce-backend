import { users } from "../data/users.js";
import type { User } from "../types/user.js";

export const findUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

export const createUser = (user: User) => {
  users.push(user);
  return user;
};