import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    catagory: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    authorImg: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Use the function reference
    },
});

// Fix: Check if the model already exists
const BlogModel = mongoose.models.blog || mongoose.model("blog", Schema);

export default BlogModel;
