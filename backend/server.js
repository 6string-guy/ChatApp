import express from 'express'
import chats from './data/data.js'
import { config as configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import  userRoutes from './routes/userRoutes.js'
import User from './models/userModel.js';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",// Specify the origin(s) you want to allow
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent with requests
  })
);
configDotenv();
connectDB();
app.use("/api/user", userRoutes);
 const PORT = process.env.PORT || 8000; 
app.listen(PORT, console.log(`Chal rha hai ${PORT} par`));


