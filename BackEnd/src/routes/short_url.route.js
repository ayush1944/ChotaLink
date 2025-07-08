import express from 'express';
import { redirectFromShortUrl, short_urlController, customShort_urlController } from '../controller/short_url.controller.js';
import wrapAsync  from '../utils/wrapAsync.js'
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/api/create',optionalAuth, wrapAsync(short_urlController));
router.get('/:id', wrapAsync(redirectFromShortUrl));

router.post("/api/custom" , optionalAuth ,wrapAsync(customShort_urlController));


export default router;