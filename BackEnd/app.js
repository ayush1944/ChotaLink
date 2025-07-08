import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import router from './src/routes/short_url.route.js'
import { authRoutes } from './src/routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { userRoutes } from './src/routes/user.route.js';

const app = express();

// More specific CORS configuration
app.use(cors({
  origin: '*'
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the router
app.use('/', router);
app.use('/', authRoutes());
app.use('/', userRoutes());


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
