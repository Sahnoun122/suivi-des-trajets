import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || "testsecret";
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || "testsecret";
  return jwt.verify(token, secret);
};
