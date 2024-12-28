import React from "react";
import Image from "next/image";
import { assets, blog_data } from "@/Assets/assets";
import Link from "next/link";

const BlogItem = ({title,description,category,image,id}) => {
    return (
        <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.3)] transition-shadow">
            {/* Blog Image */}
            <Link href={`/blogs/${id}`}>
            <Image
                src={image}
                alt="Blog Thumbnail"
                width={400}
                height={400}
                className="border-b border-black rounded-t-lg object-cover"
            />
            </Link>
            {/* Blog Content */}
            <div className="p-4">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-black rounded-full">
                    {category}
                </span>

                {/* Blog Title */}
                <h1 className="text-base font-medium text-gray-900 mb-2 hover:text-black transition-colors">
                    {title}
                </h1>

                {/* Blog Description */}
                <div className="blog-content"
                  dangerouslySetInnerHTML={{ __html: description.slice(0,120)}}>
                </div>

                {/* Read More Link */}
                <Link href={`/blogs/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-700 cursor-pointer transition-colors">
                    Read More
                    <Image
                        src={assets.arrow}
                        alt="Arrow Icon"
                        width={16}
                        height={16}
                        className="ml-2"
                    />
                </Link>
            </div>
        </div>
    );
};

export default BlogItem;
