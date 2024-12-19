"use client";
import React, { useState } from "react";
import { HomeIcon, ShoppingCartIcon, LayoutGridIcon, UserIcon, LayoutDashboard, Heart, LogIn } from "lucide-react";
import Link from "next/link";
import { NavLink } from "@/types/Types";

export const navLinks: NavLink[] = [
    {
        name: "Home",
        href: "/home",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        name: "Veggies",
        href: "/products",
        icon: <LayoutGridIcon className="w-6 h-6" />,
    },
    {
        name: "Orders",
        href: "/my-order",
        icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
        name: "Wishlist",
        href: "/wishlist",
        icon: <Heart className="w-6 h-6" />,
    },
    {
        name: "Admin",
        href: "/dashboard",
        icon: <LayoutDashboard className="w-6 h-6" />,
    },
];

export const mobileNavLinks: NavLink[] = [
    {
        name: "Home",
        href: "/home",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        name: "Veggies",
        href: "/products",
        icon: <LayoutGridIcon className="w-6 h-6" />,
    },
    {
        name: "Cart",
        href: "/cart",
        icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
        name: "User",
        href: "/user",
        icon: <UserIcon className="w-6 h-6" />,
    },
];

const Header: React.FC = () => {
    const userData = JSON.parse(localStorage.getItem("veggies:user") || "{}");
    const role = userData?.data?.role;

    // Filter navLinks to only show Admin link if the role is 'admin'
    const filteredNavLinks = role === "admin" ? navLinks : navLinks.filter(link => link.name !== "Admin");

    const [activeLink, setActiveLink] = useState<string>(filteredNavLinks[0].href);

    return (
        <>
            {/* Header for laptop screens */}
            <nav className="w-full fixed top-0 z-50 flex flex-col max-[800px]:hidden bg-mainBg text-mainText p-3">
                <div className="flex items-center justify-between mx-3">
                    <div className="flex items-center justify-center">
                        <div className="text-2xl font-bold">Kk<span className="text-mainText">Veggies</span></div>
                    </div>

                    <ul className="flex justify-center gap-4 ">
                        {filteredNavLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>
                                    <span
                                        className={`flex items-center space-x-2 p-2 rounded-lg transition-colors text-mainText dark:text-gray-800 duration-200 ${activeLink === link.href
                                            ? "border-b-mainText border-b dark:border-b-black dark:text-white"
                                            : " hover:border-b-mainText hover:border-b dark:hover:border-b-black dark:hover:text-white"
                                            }`}
                                        onClick={() => setActiveLink(link.href)}
                                    >
                                        {link.icon}
                                        <h6>{link.name}</h6>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Icons (User Profile, Cart) */}
                    <div className="flex items-center space-x-6">
                        <Link href="/cart">
                            <ShoppingCartIcon className="w-6 h-6 text-mainText" />
                        </Link>
                        {userData.token ? (
                            <Link href={"/user"}>
                                <UserIcon className="w-6 h-6 text-mainText" />
                            </Link>
                        ) : (
                            <Link href="/login">
                                <LogIn className="w-6 h-6 text-mainText" />
                            </Link>)}
                    </div>
                </div>
            </nav>

            {/* Bottom navigation for mobile screens */}
            <nav className="z-50 hidden max-[800px]:block fixed bottom-0 inset-x-0 bg-mainBg dark:bg-white p-1" style={{ borderRadius: "1.5rem 1.5rem 0 0" }}>
                <ul className="flex justify-around">
                    {mobileNavLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href}>
                                <span
                                    className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 text-mainText dark:text-gray-800 ${activeLink === link.href
                                        ? "border-b-mainText border-b dark:border-b-black dark:text-white"
                                        : " hover:border-b-mainText hover:border-b dark:hover:border-b-black dark:hover:text-white"
                                        }`}
                                    onClick={() => setActiveLink(link.href)}
                                >
                                    {link.icon}
                                    <h6 className="text-xs">{link.name}</h6>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Header;
