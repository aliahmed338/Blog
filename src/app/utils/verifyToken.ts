import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { Payload } from "./type";

//for api
export function verifyToken(request: NextRequest): Payload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) return null;
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as Payload;

    return userPayload;
  } catch (err) {
    return null;
  }
}

// for pages
export function verifyTokenForPage(token: string): Payload | null {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as Payload;
    if (!userPayload) return null;
    return userPayload;
  } catch (err) {
    return null;
  }
}
