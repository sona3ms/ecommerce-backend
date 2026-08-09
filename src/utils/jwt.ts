import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (id: number, email: string) => {
  return jwt.sign(
    {
      id,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as {
    id: number;
    email: string;
  };
};