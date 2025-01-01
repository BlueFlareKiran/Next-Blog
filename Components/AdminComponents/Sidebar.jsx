import React from 'react';
import Image from 'next/image';
import { assets } from '@/Assets/assets';
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="flex flex-col w-28 sm:w-80 bg-slate-100 border-l border-black relative">
                {/* Logo Section */}
                <div className="px-2 sm:pl-14 py-3 border-b border-black">
                    <Link href={'/'}>
                        <Image src={assets.logo} width={120} alt="Logo" priority />
                    </Link>
                </div>

                {/* Content Section */}
                <div className="flex-1 py-12 px-4">
                    <div className="w-[50%] sm:w-[80%] absolute right-0">
                        <Link href={'/admin/addProduct'}
                            className="flex items-center gap-3 px-3 py-2 bg-white border border-black shadow-[-5px_5px_0px_#000000] font-medium">
                            <Image src={assets.add_icon} alt="Add Icon" width={28} priority />
                            <p className="hidden sm:block">Add Blogs</p>
                        </Link>
                        <Link href={'/admin/bloglist'}
                            className="mt-5 flex items-center gap-3 px-3 py-2 bg-white border border-black shadow-[-5px_5px_0px_#000000] font-medium">
                            <Image src={assets.blog_icon} alt="Add Icon" width={28} priority />
                            <p className="hidden sm:block">Blog lists</p>
                        </Link>
                        <Link href={'/admin/subscription'}
                            className="mt-5 flex items-center gap-3 px-3 py-2 bg-white border border-black shadow-[-5px_5px_0px_#000000] font-medium">
                            <Image src={assets.email_icon} alt="Add Icon" width={28} priority />
                            <p className="hidden sm:block">Subscriptions</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
