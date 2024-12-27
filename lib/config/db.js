import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://kiran:nnSsqcitBlAcpkTW@cluster0.vnpfq.mongodb.net/blog-app')
    console.log("Database connected");
}