import User from "../models/user.model.js";
import ShortUrl from "../models/shorturl.model.js";

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

export const findUserById = async (id) => {
    return await User.findById(id).select("-password");
}

export const createUser = async (name, email, password) => {
    const user = new User({
        name,
        email,
        password,
    });
    return await user.save();
}

export const findUserUrls = async (userId) => {
    return await ShortUrl.find({ user: userId })
        .sort({ createdAt: -1 })
        .lean();
}
