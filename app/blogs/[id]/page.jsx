'use client';
import React, { useEffect, useState } from 'react';
import { assets } from "@/Assets/assets";
import Image from "next/image";
import Footer from '@/Components/Footer';
import Link from 'next/link';
import axios from "axios";

// Unwrap params using `React.use()`
const Page = ({ params: paramPromise }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchBlogData = async (id) => {
        try {
            const response = await axios.get('/api/blog', {
                params: {
                    id: id || '',
                },
            });
            setData(response.data);
        } catch (err) {
            console.error("Error fetching blog data:", err);
            setError('Failed to load blog data. Please try again later.');
        }
    };

    useEffect(() => {
        const fetchParams = async () => {
            const params = await paramPromise; // Await the paramPromise
            if (params?.id) {
                fetchBlogData(params.id); // Use params.id safely after unwrapping
            }
        };

        fetchParams();
    }, [paramPromise]);

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-600 font-semibold">{error}</p>
            </div>
        );
    }

    return data ? (
        <>
            <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src={assets?.logo || '/placeholder-logo.png'}
                            alt="Website Logo"
                            width={120}
                            height={60}
                            className="w-[130px] sm:w-auto"
                        />
                    </Link>
                    <button
                        className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]"
                    >
                        Get Started <Image src={assets?.arrow || '/placeholder-arrow.png'} alt="Arrow Icon" />
                    </button>
                </div>
                <div className="text-center my-24">
                    <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
                        {data.title || 'Blog Title'}
                    </h1>
                    <Image
                        className="mx-auto mt-6 border-white rounded-full"
                        src={assets.profile_icon || '/placeholder-author.png'}
                        width={60}
                        height={60}
                        alt="Author's Profile"
                    />
                    <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data?.author || 'Author Name'}</p>
                </div>
            </div>
            <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
                <Image
                    className="border-4 border-white"
                    src={data?.image || '/placeholder-blog.png'}
                    width={1280}
                    height={720}
                    alt="Blog Main Image"
                    priority // Use priority if this image is above the fold
                />
                <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
                <p>{data?.description || 'No description available.'}</p>
                <div className="my-24">
                    <p className="text-black font-semibold my-4">Share this article on social media</p>
                    <div className="flex gap-3">
                        <Image
                            src={assets?.facebook_icon || '/placeholder-facebook.png'}
                            width={50}
                            height={50}
                            alt="Share on Facebook"
                        />
                        <Image
                            src={assets?.twitter_icon || '/placeholder-twitter.png'}
                            width={50}
                            height={50}
                            alt="Share on Twitter"
                        />
                        <Image
                            src={assets?.googleplus_icon || '/placeholder-googleplus.png'}
                            width={50}
                            height={50}
                            alt="Share on Google Plus"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) : (
        <div className="text-center py-20">
            <p>Loading blog details...</p>
        </div>
    );
};

export default Page;