import { cookieOptions } from "../config/cookie.option.js";
import { findUserByEmail } from "../dao/user.dao.js";
import { logedinUser, registerUser } from "../services/auth.services.js";
import wrapAsync from "../utils/wrapAsync.js";

export const registerController = wrapAsync(async (req, res) => {
    const {name, email, password} = req.body;
    const {token, userWithoutPassword} = await registerUser(name, email, password);
    res.cookie("token", token, cookieOptions); 
    res.status(201).json({
        message: "User created successfully",
        data: token,
        user: userWithoutPassword,
        success: true,
        error: null,
    });
})

export const loginController = wrapAsync(async (req, res) => {
    const {email, password} = req.body;
    const {token, userWithoutPassword} = await logedinUser(email, password);
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
        message: "Login successful",
        user:   userWithoutPassword,
        data: token,
        success: true,
        error: null,
    });
})

export const logoutController = wrapAsync(async (req, res) => {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({
        message: "Logout successful",
        data: null,
        success: true,
        error: null,
    });
})

export const get_current_user = wrapAsync(async (req, res) => {
    res.status(200).json({
        message: "User fetched successfully",
        data: req.user,
        success: true,
        error: null,
    });
})