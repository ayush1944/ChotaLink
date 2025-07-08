import { nanoid } from "nanoid"
import { cookieOptions } from "../config/cookie.option.js";
import jwt from "jsonwebtoken";

export const generateNanoId = (lenght) => {
    return nanoid(lenght);
}
 
export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: cookieOptions.maxAge / 1000});
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id; // This only returns the ID
    } catch (error) {
        throw new Error("Invalid token");
    }
}