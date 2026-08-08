import type { Request, Response } from "express";
import * as authService from "../services/authService.js";

// POST /auth/register
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Validate request body
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }

  const result = await authService.register(name, email, password);

  if (!result.success) {
    return res.status(409).json({
      message: result.message,
    });
  }

  const user = result.user!;

  const { password: _password, ...userWithoutPassword } = user;

  return res.status(201).json({
    message: "User registered successfully",
    user: userWithoutPassword,
  });
};

// POST /auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const result = await authService.login(email, password);

  if (!result.success) {
    return res.status(401).json({
      message: result.message,
    });
  }

  const user = result.user!;

  const { password: _password, ...userWithoutPassword } = user;

return res.status(200).json({
  message: "Login successful",
  token: result.token,
  user: userWithoutPassword,
});
};