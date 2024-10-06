import mongoose from "mongoose";
import dotenv from "dotenv";

const mongoUri = process.env.MONGO_URI;
dotenv.config();

export const connectDB = async (): Promise<boolean> => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    const con = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${con.connection.host}`);
    return true;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Process code 1 means exit with failure,0 means success
    return false; // This line will never be reached, but it's here for completeness
  }
}