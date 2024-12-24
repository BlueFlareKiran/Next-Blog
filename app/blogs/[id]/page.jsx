'use client';
import React, { useEffect, useState } from 'react';
import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Footer from '@/Components/Footer';
import Link from 'next/link';
import { use } from "react";

const Page = ({ params: paramsPromise }) => {
    const params = use(paramsPromise); // Unwrap the `params` promise
    const [data, setData] = useState(null);

    const fetchBlogData = () => {
        const foundData = blog_data.find(blog => String(blog.id) === params.id);
        if (foundData) {
            setData(foundData);
            console.log(foundData);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, [params]); // Depend on `params` to ensure it works as expected

    return data ? (
        <>
            <div className={'bg-gray-200 py-5 px-5 md:px-12 lg:px-28'}>
                <div className={'flex items-center justify-between'}>
                    <Link href='/'>
                        <Image
                            src={assets.logo}
                            alt="Logo"
                            width={120}
                            className={'w-[130px] sm:w-auto'}
                        />
                    </Link>

                    <button
                        className={
                            'flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'
                        }
                    >
                        Get Started <Image src={assets.arrow} alt="Arrow" />
                    </button>
                </div>
                <div className={'text-center my-24'}>
                    <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>
                        {data.title}
                    </h1>
                    <Image
                        className='mx-auto mt-6 border-white rounded-full'
                        src={data.author_img}
                        width={60}
                        height={60}
                        alt="Author Image"
                    />
                    <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
                </div>
            </div>
            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
                <Image
                    className='border-4 border-white'
                    src={data.image}
                    width={1280}
                    height={720}
                    alt="Blog Image"
                />
                <h1 className='my-8 text-[26px] font-semibold'>Introduction: </h1>
                <p>{data.description}</p>
                <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self-Reflection and Goal Shifting</h3>
                <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis odit quia unde illo enim, pariatur vero officia at itaque cum nulla recusandae dicta facilis officiis reiciendis magnam ducimus! Tempora, perspiciatis!</p>
                <h3 className='my-5 text-[18px] font-semibold'>Step 2: Self-Reflection and Goal Shifting</h3>
                <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis odit quia unde illo enim, pariatur vero officia at itaque cum nulla recusandae dicta facilis officiis reiciendis magnam ducimus! Tempora, perspiciatis!</p>
                <h3 className='my-5 text-[18px] font-semibold'>Step 3: Self-Reflection and Goal Shifting</h3>
                <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis odit quia unde illo enim, pariatur vero officia at itaque cum nulla recusandae dicta facilis officiis reiciendis magnam ducimus! Tempora, perspiciatis!</p>
                <h3 className='my-5 text-[18px] font-semibold'>Conclusion</h3>
                <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis odit quia unde illo enim, pariatur vero officia at itaque cum nulla recusandae dicta facilis officiis reiciendis magnam ducimus! Tempora, perspiciatis!</p>
                <div className='my-24'>
                    <p className='text-black font-semibold my-4'>Share this article on social media</p>
                    <div className="flex gap-3">
                        <Image src={assets.facebook_icon} width={50} height={50} alt="Facebook Icon" />
                        <Image src={assets.twitter_icon} width={50} height={50} alt="Twitter Icon" />
                        <Image src={assets.googleplus_icon} width={50} height={50} alt="Google Plus Icon" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) : (
        <></>
    );
};

export default Page;