import { assets } from "@/Assets/assets";
import React, {useState} from "react";
import Image from "next/image";
import axios from "axios";
import {toast} from "react-toastify";

const Header = () => {

    const [email, setEmail] = useState("");
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        const response=await axios.post('/api/email',formData);
        if(response.data.success){
            toast.success(response.data.msg);
            setEmail("");
        }
        else {
            toast.error("Error");
        }
    }

    return (
        <div className="py-5 px-5 md:px-12 lg:px-28">
            {/* Logo and Button */}
            <div className="flex justify-between items-center">
                <Image
                    src={assets.logo}
                    width={180}
                    alt="Logo"
                    className="w-[130px] sm:w-auto"
                />
                <button className="flex items-center gap-2 font-medium text-black border border-black py-1 px-3 sm:py-3 sm:px-6 shadow-[-7px_7px_0px_#000000] hover:bg-gray-100">
                    Get Started
                </button>
            </div>

            {/* Header Title and Description */}
            <div className="text-center my-8">
                <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
                <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi,
                    molestiae dolorum sapiente harum ratione porro repellat qui recusandae?
                    Hic odio asperiores quibusdam molestiae et molestias. Facilis ipsa sunt
                    voluptatum.
                </p>
            </div>

            {/* Subscription Form */}
            <form
                onSubmit={onSubmitHandler}
                className="flex items-center justify-between max-w-[500px] mx-auto mt-10 border border-black rounded-md overflow-hidden shadow-[-7px_7px_0px_#000000]"
                action=""
            >
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-4 py-3 w-full text-sm sm:text-base outline-none placeholder-gray-500"
                    aria-label="Email Address"
                />
                <button

                    className="border-l border-black bg-black text-white py-3 px-6 sm:px-8 hover:bg-gray-700 active:bg-gray-600"
                    type="submit"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default Header;
