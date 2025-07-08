import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getAllUserUrls } from '../controller/user.controller.js';
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

export const userRoutes = () => {
    router.get('/api/user/urls', authMiddleware, wrapAsync(getAllUserUrls));
    return router;
};
