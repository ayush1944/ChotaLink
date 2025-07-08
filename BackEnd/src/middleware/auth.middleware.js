import { verifyToken } from "../utils/helper.js";
import { findUserById } from "../dao/user.dao.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            data: null,
            success: false,
            error: "Unauthorized",
        });
    }
    try {
        const userId = verifyToken(token);
        const user = await findUserById(userId);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
                data: null,
                success: false,
                error: "User not found",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
            data: null,
            success: false,
            error: "Unauthorized",
        });
    }
}
// Optional authentication - continues even if no token
export const optionalAuth = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return next();
    }
    try {
        const userId = verifyToken(token);
        const user = await findUserById(userId);
        req.user = user;
    } catch (error) {
        // Ignore token errors for optional auth
    }
    next();
};
