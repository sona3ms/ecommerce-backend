import * as authRepository from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = authRepository.findUserByEmail(email);

  if (existingUser) {
    return {
      success: false,
      message: "User with this email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  };

  authRepository.createUser(newUser);

  return {
    success: true,
    user: newUser,
  };
};

export const login = async (
  email: string,
  password: string
) => {
  const user = authRepository.findUserByEmail(email);

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const token = generateToken(user.id, user.email);

return {
  success: true,
  user,
  token,
};
};