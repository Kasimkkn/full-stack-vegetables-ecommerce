"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import FooterController from "@/components/shared/FooterController";
import HeaderController from "@/components/shared/HeaderController";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Pages to exclude from AuthProvider
  const excludedPaths = ["/home", "/products"];
  const isExcluded = excludedPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderController />
        {isExcluded ? (
          <main>{children}</main>
        ) : (
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        )}
        <FooterController />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
