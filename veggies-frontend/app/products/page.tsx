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
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({
        categories: {
            vegetables: false,
            fruits: false,
        },
    });
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>("Latest");

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    // Fetch Products for the Current Page
    const fetchProducts = async (page: number) => {
        try {
            const response = await fetchAllProducts(page);
            console.log('response', response)
            const { products, totalPage } = response.data;
            setProducts(products);
            setTotalPages(totalPage);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products.");
        }
    };

    // Handle Filter Changes
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

    // Fetch data when the page changes
    useEffect(() => {
        console.log('currentPage', currentPage)
        fetchProducts(currentPage);
    }, [currentPage]);

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
                <div className="w-full">
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
                        {products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                                    {products.map((product: Product) => (
                                        <ProductCard
                                            key={product._id}
                                            image={product.photo}
                                            price={product.price}
                                            title={product.name}
                                            productId={product._id}
                                            stock={product.stock}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-center gap-2 mt-10">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        className="px-4 py-2 bg-gray-200 rounded"
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-4 py-2 ${currentPage === i + 1 ? "bg-mainBg text-white" : "bg-gray-200"} rounded`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        className="px-4 py-2 bg-gray-200 rounded"
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-600 text-center py-8">No products</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsList;
