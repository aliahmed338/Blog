import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { Payload } from "./type";



const generateToken = (payload: Payload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  return token;
};

export const setCookies = (payload: Payload): string => {
  const token = generateToken(payload);
  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return cookie;
};
