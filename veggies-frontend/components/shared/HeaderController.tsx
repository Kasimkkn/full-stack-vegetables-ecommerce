"use client"
import React from 'react'

import Header from "@/components/shared/Header";
import { usePathname } from 'next/navigation';
const HeaderController = () => {
    const pathname = usePathname();
    // don't show header on /dashboard
    if (pathname.startsWith("/dashboard") || pathname === "/dashboard" || pathname === "/login" || pathname === "/signup") return null;
    return <Header />;
}
export default HeaderController