"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/Types";
import toast from "react-hot-toast";
const OurFeatured = ({ products, loading }: { products: Product[], loading: boolean }) => {
    const [cart, setCart] = useState<Product[]>([]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const storedCart = localStorage.getItem("veggies:cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("veggies:cart", JSON.stringify(cart));
        }
    }, [cart]);
    const addItem = (item: Product) => {
        if (item.stock <= 0) return toast.error("Item out of stock");
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((cartItem) => cartItem._id === item._id);

            if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...prevCart[existingItemIndex],
                    quantity: prevCart[existingItemIndex].quantity + 1,
                };
                return updatedCart;
            }

            return [...prevCart, { ...item, quantity: 1 }];
        });

        toast.success("Item added to cart");
    };
    return (
        <section className="py-12 bg-white">
            <div className="px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Our Featured Products
                    </h2>
                    <p className="mt-4 text-base font-normal leading-7 text-gray-600">
                        Best Veggies For You , Best Quality , Best Price
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-10 lg:gap-4 lg:grid-cols-4 md:mx-56">
                    {loading ? (
                        <div className="text-2xl text-black">Loading...</div>
                    ) : (
                        <>
                            {products.map((product, index) => (
                                <ProductCard
                                    image={product.photo}
                                    price={product.price}
                                    title={product.name}
                                    key={index}
                                    addToCart={() => addItem(product)}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section >
    );
};

export default OurFeatured;
