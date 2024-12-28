import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './database/db.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';

const app=express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.use((err, req, res, next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "internal server error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})

const port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})