import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import {fs} from 'fs'

export async function GET(request) {
    await ConnectDB(); // Ensure DB connection for each API call
    try {
        const blogId = request.nextUrl.searchParams.get("id");
        if (blogId) {
            const blog = await BlogModel.findById(blogId);
            if (!blog) {
                return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json(blog);
        } else {
            const blogs = await BlogModel.find({});
            return NextResponse.json({ blogs });
        }
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return NextResponse.json({ success: false, msg: "Failed to fetch blog data" }, { status: 500 });
    }
}

export async function POST(request) {
    await ConnectDB(); // Ensure DB connection for each API call
    try {
        const formData = await request.formData();
        const timestamp = Date.now();

        // Validate formData fields
        const requiredFields = ["title", "description", "category", "author", "image", "authorImg"];
        for (const field of requiredFields) {
            if (!formData.get(field)) {
                return NextResponse.json({ success: false, msg: `Missing field: ${field}` }, { status: 400 });
            }
        }

        // Process and save the image
        const image = formData.get("image");
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const imagePath = path.join(process.cwd(), "public", `${timestamp}_${image.name}`);
        await writeFile(imagePath, buffer);

        const imgUrl = `/${timestamp}_${image.name}`;
        const blogData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            author: formData.get("author"),
            image: imgUrl,
            authorImg: formData.get("authorImg"),
        };

        // Save to database
        await BlogModel.create(blogData);
        console.log("Blog saved");

        return NextResponse.json({ success: true, msg: "Blog saved" });
    } catch (error) {
        console.error("Error saving blog:", error);
        return NextResponse.json({ success: false, msg: "Failed to save blog" }, { status: 500 });
    }
}
// export async function DELETE(request) {
//
//         const id = await request.nextUrl.searchParams.get("id");
//         const blog = await BlogModel.findById(id);
//         fs.unlink(`/public/${blog.image}`, () => {});
//         await BlogModel.findByIdAndDelete(id);
//         return NextResponse.json({ success: true, msg: "Blog deleted" });
// }

export async function DELETE(request) {
    await ConnectDB(); // Ensure DB connection for each API call

    try {
        const id = request.nextUrl.searchParams.get("id");

        // Find the blog in the database
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
        }

        // Resolve the image path and delete the image file
        const imagePath = path.join(process.cwd(), "public", blog.image);
        try {
            await fs.promises.unlink(imagePath);
        } catch (err) {
            console.error(`Error deleting file: ${imagePath}`, err);
            // Continue even if the file doesn't exist
        }

        // Delete the blog entry from the database
        await BlogModel.findByIdAndDelete(id);

        return NextResponse.json({ success: true, msg: "Blog deleted" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ success: false, msg: "Failed to delete blog" }, { status: 500 });
    }
}
