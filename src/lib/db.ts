import mongoose from "mongoose";
import { GridFSBucket } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();


export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    const con = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${con.connection.host}`);
    
    if (mongoose.connection.db) {
      
    } else {
      throw new Error("Failed to initialize GridFSBucket: mongoose.connection.db is undefined");
    }
    return true;
  } catch (error:any) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Process code 1 means exit with failure,0 means success
    return false; // This line will never be reached, but it's here for completeness
  }
}