"use client";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import required CSS for Toast

export default function Layout({ children }) {
    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark" /> {/* ToastContainer here */}
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                        <h3 className="font-medium">Admin Panel</h3>
                        <Image src={assets.profile_icon} alt="Profile Icon" width={40} height={40} />
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}
