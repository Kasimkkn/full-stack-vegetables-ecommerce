"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/shared/Footer";

export default function FooterController() {
    const pathname = usePathname();

    if (pathname !== "/home") return null;

    return <Footer />;
}
