import express from 'express';
import { get_current_user, loginController, logoutController, registerController } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

export const authRoutes = () => {

    router.post('/auth/login', loginController);
    router.post('/auth/register', registerController);
    router.get('/auth/logout', logoutController)
    router.get('/auth/me', authMiddleware, get_current_user)


    return router;
};