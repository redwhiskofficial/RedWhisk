import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectToMongoDB } from './config/mongodb.js';
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(cors());
app.use(express.json());
connectToMongoDB();

app.get('/', (req, res) => {
  res.send('RedWhisk Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
