import * as authRepository from "../repositories/authRepository.js";

export const register = (
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

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  authRepository.createUser(newUser);

  return {
    success: true,
    user: newUser,
  };
};