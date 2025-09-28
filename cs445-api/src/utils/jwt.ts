import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../config";

const SECRET_KEY: Secret = process.env.JWT_SECRET || "your-secret-key";

export const jwtToken = (data = {}, options = {}) => {
  return jwt.sign(data, config.JWT.JWT_ENCRYPTION, options);
};

export const pareJwtToken = (token: string, options = {}) => {
  try {
    const data = jwt.verify(token, config.JWT.JWT_ENCRYPTION, { ...options });
    return data;
  } catch (err) {
    return err;
  }
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
