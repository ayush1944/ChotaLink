import axiosInstance from "../utils/axios.instance.js";

export const createShortUrl = async (originalUrl) => {
    try {
        const { data } = await axiosInstance.post("/api/create", {
            originalUrl,
        });
        return data;
    } catch (error) {
        console.error("Error creating short URL:", error);
        throw error;
    }
}

export const createCustomShortUrl = async (originalUrl, slug) => {
    try {
        const { data } = await axiosInstance.post("/api/custom", {
            originalUrl,
            slug,
        });
        return data;
    } catch (error) {
        console.error("Error creating short URL:", error);
        throw error;
    }
}

export const registerUser = async (name, email, password) => {
    try {
        const { data } = await axiosInstance.post("/auth/register", {
            name,
            email,
            password,
        });
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export const loginUser = async (email, password) => {
    try {
        const { data } = await axiosInstance.post("/auth/login", {
            email,
            password,
        });
        return data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export const logoutUser = async ()=>{
    try {
        const { data } = await axiosInstance.get("/auth/logout");
        return data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}

export const getCurrentUser = async ()=>{
    try {
        const { data } = await axiosInstance.get("/auth/me");
        return data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
}

export const getAllUserUrls = async () => {
    try {
        const { data } = await axiosInstance.get("/api/user/urls");
        return data;
    } catch (error) {
        console.error("Error fetching user urls:", error);
        throw error;
    }
}
