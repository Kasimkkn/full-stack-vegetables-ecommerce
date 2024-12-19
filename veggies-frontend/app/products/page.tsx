"use client";
import ProductCard from "@/components/ui/ProductCard";
import { fetchAllProducts } from "@/service/products.service";
import { Product } from "@/types/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Filters Type
type Filters = {
    categories: Record<string, boolean>;
};

// Sorting Options
type SortOption = "Latest" | "PriceLowToHigh" | "Alphabetical";

const ProductsList = () => {
    const [product, setProduct] = useState<Product[] | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({
        categories: {
            vegetables: false,
            fruits: false,
        },
    });
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>("Latest");

    const [cart, setCart] = useState<Product[]>([]);

    // Load cart from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("veggies:cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to localStorage
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

    const handleFilterChange = (category: string) => {
        setFilters((prev) => ({
            ...prev,
            categories: {
                ...prev.categories,
                [category]: !prev.categories[category],
            },
        }));
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as SortOption);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Fetch Products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetchAllProducts();
                console.log("response", response);
                setProduct(response.data.products);
                setFilteredProducts(response.data.products); // Initialize filteredProducts
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Update Filtered Products State
    useEffect(() => {
        if (!product) return;

        let result = [...product];

        // Categories Filter
        const activeCategories = Object.entries(filters.categories)
            .filter(([_, isActive]) => isActive)
            .map(([category]) => category);

        if (activeCategories.length > 0) {
            result = result.filter((prod) => activeCategories.includes(prod.category));
        }

        // Search Filter
        if (searchTerm) {
            result = result.filter((prod) =>
                prod.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sorting
        if (sortBy === "PriceLowToHigh") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Alphabetical") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredProducts(result);
    }, [product, filters.categories, searchTerm, sortBy]);

    return (
        <section className="max-md:pb-20 md:mt-16 bg-gray-50 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-2 p-3">
                {/* Sidebar Filters */}
                <div className="flex md:flex-col flex-row-reverse max-md:whitespace-nowrap md:w-2/12 bg-white md:p-4 p-3 border border-black/10 rounded-md max-md:overflow-x-auto max-md:gap-4 max-md:items-center">
                    {/* Category Filter */}
                    <div className="max-md:w-full flex md:flex-col gap-3 min-w-max md:mb-6 md:border-b border-black/10 md:pb-4">
                        <h3 className="max-md:hidden text-xl font-semibold mb-4 text-gray-800">
                            Categories
                        </h3>
                        {Object.keys(filters.categories).map((category) => (
                            <label key={category} className="flex">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-blue-600 h-5 w-5"
                                    checked={filters.categories[category]}
                                    onChange={() => handleFilterChange(category)}
                                />
                                <span className="ml-2 text-gray-700 capitalize">{category}</span>
                            </label>
                        ))}
                    </div>

                    {/* Sorting */}
                    <div className="max-md:w-full min-w-max">
                        <h3 className="max-md:hidden text-xl font-semibold mb-4 text-gray-800">
                            Sort By
                        </h3>
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="w-full border border-black/10 rounded-lg focus:ring-1 focus:ring-black/10 outline-none focus:border-none"
                        >
                            <option value="Latest">Latest</option>
                            <option value="PriceLowToHigh">Price: Low to High</option>
                            <option value="Alphabetical">Alphabetical</option>
                        </select>
                    </div>
                </div>

                {/* Product List */}
                <div className="">
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full p-2 border border-black/10 rounded-lg focus:ring-1 focus:ring-black/10 outline-none focus:border-none"
                        />
                    </div>
                    <div className="md:pb-20 md:max-h-[80vh] md:overflow-x-scroll">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
                                {filteredProducts.map((product: Product, index: number) => (
                                    <ProductCard
                                        key={index}
                                        image={product.photo}
                                        price={product.price}
                                        title={product.name}
                                        productId={product._id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center py-8">
                                No products
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsList;
