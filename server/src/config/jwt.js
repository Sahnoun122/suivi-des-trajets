
import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};
