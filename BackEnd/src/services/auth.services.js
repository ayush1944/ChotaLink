import { findUserByEmail, createUser } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";
import bcrypt from "bcryptjs";

export const registerUser = async (name, email, password)=>{
    const user = await findUserByEmail(email);
    if (user) {
        throw new Error("User already exists");
    }
   const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(name, email, hashedPassword);
        const userWithoutPassword = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar
    };


    const token = signToken({id: newUser._id});

    return {token, userWithoutPassword};
}

export const logedinUser = async (email, password)=>{
    const user = await findUserByEmail(email);
    
    if (!user ) {
        throw new Error("Invalid credentials");
        return {message: "Invalid credentials"};
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
        return {message: "Invalid credentials"};
    }

    const userWithoutPassword = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
    };
    
    

    const token = signToken({id: user._id});

    return { token, userWithoutPassword};
}