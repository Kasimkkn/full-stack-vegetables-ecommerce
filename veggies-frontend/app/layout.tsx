import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterController from "@/components/shared/FooterController";
import HeaderController from "@/components/shared/HeaderController";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KKVegies - Vegetable & Fruit Delivery Platform",
  description: "Fresh Vegetables & Fruits Delivered to Your Doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderController />
        <main>{children}</main>
        <FooterController />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
