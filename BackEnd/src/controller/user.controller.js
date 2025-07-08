import { findUserUrls } from "../dao/user.dao.js";

export const getAllUserUrls = async (req, res) => {
    const { _id } = req.user;
    const urlsData = await findUserUrls(_id);
    
    res.status(200).json({
        message: "URLs fetched successfully",
        urls: urlsData, // This matches what the frontend expects
        success: true,
        error: null,
    });
}
