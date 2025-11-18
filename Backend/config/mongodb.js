import mongoose  from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URL

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
}; 
export default connectToMongoDB