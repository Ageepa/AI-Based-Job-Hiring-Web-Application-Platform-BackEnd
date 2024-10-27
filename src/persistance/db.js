import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Missing MONGODB_URI env variable.");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connections successful!");
  } catch (error) {
    console.log(error);
  }
};