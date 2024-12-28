"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup", // Updated to "category"
        author: "Kiran",
        authorImg: "author_img.png",
    });

    // Handle preview image for client-side rendering only
    useEffect(() => {
        if (image) {
            const previewUrl = URL.createObjectURL(image);
            setPreviewImage(previewUrl);
            return () => URL.revokeObjectURL(previewUrl); // Cleanup URL to avoid memory leaks
        }
    }, [image]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("author", data.author);
        formData.append("authorImg", data.authorImg);
        formData.append("image", image);

        try {
            const response = await axios.post("/api/blog", formData);
            if (response?.data?.success) {
                toast.success(response.data.message || "Blog added successfully!");
                setImage(false);
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Kiran",
                    authorImg: "author_img.png",
                });
            } else {
                toast.error(response.data.message || "Failed to add the blog.");
            }
        } catch (error) {
            toast.error("An error occurred while submitting the form.");
            console.error("API error:", error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
            <p className="text-xl">Upload thumbnail</p>
            <label htmlFor="image">
                <Image
                    className="mt-4"
                    src={previewImage || assets.upload_area}
                    alt="Upload area"
                    width={140}
                    height={70}
                />
            </label>
            <input
                type="file"
                id="image"
                hidden
                required
                onChange={(e) => setImage(e.target.files[0])}
            />

            <p className="text-xl mt-4">Blog title</p>
            <input
                name="title"
                className="w-full sm:w-[500px] mt-4 px-3 border"
                type="text"
                placeholder="Title"
                required
                onChange={onChangeHandler}
                value={data.title}
            />

            <p className="text-xl mt-4">Blog Description</p>
            <textarea
                name="description"
                className="w-full sm:w-[500px] mt-4 px-3 border"
                placeholder="Write content here"
                required
                rows={6}
                onChange={onChangeHandler}
                value={data.description}
            />

            <p className="text-xl mt-4">Blog category</p>
            <select
                name="category"
                className="w-40 mt-4 px-4 py-3 border text-gray-500"
                onChange={onChangeHandler}
                value={data.category}
            >
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
<br/>
            <button
                type="submit"
                className="mt-8 w-40 h-12 bg-black text-white rounded"
            >
                Add
            </button>
        </form>
    );
};

export default Page;
