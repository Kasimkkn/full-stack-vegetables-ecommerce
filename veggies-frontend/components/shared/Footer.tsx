"use client";
import { NavLink } from "@/types/Types";
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon, HomeIcon, LayoutGridIcon, SearchIcon, ShoppingCartIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

export const navLinks: NavLink[] = [
    {
        name: "Home",
        href: "/home",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        name: "Search",
        href: "/search",
        icon: <SearchIcon className="w-6 h-6" />,
    },
    {
        name: "Cart",
        href: "/cart",
        icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
        name: "More",
        href: "/more",
        icon: <LayoutGridIcon className="w-6 h-6" />,
    },
];

const Footer = () => {
    return (
        <footer className="bg-mainBg text-mainText py-8 max-md:pb-20 ">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                {/* Company Information */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Kk<span className="text-mainText">MEd</span></h3>
                    <p>SOLOGAN COMPANY</p>
                    <p>123 Street Name, City, State, 12345</p>
                    <p>Phone: +123-456789</p>
                    <p>Email: company@domain.com</p>
                </div>

                {/* Navigation Menu */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>
                                    <span className="hover:text-mainText">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Other Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/faq">
                                <span className="hover:text-mainText">FAQ</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/policy">
                                <span className="hover:text-mainText">Policy</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/services">
                                <span className="hover:text-mainText">Services</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/teams">
                                <span className="hover:text-mainText">Teams</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link href="https://facebook.com">
                            <FacebookIcon className="w-6 h-6 hover:text-mainText" />
                        </Link>
                        <Link href="https://twitter.com">
                            <TwitterLogoIcon className="w-6 h-6 hover:text-mainText" />
                        </Link>
                        <Link href="https://instagram.com">
                            <InstagramLogoIcon className="w-6 h-6 hover:text-mainText" />
                        </Link>
                        <Link href="https://linkedin.com">
                            <LinkedInLogoIcon className="w-6 h-6 hover:text-mainText" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8 text-mainText border-t border-t-teal-900 pt-6">
                © 2024 Company. All rights reserved.
            </div>
        </footer >

    )
}

export default Footer