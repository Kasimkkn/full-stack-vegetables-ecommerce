"use client";
import CommonModal from "@/components/ui/CommonModal";
import { fetchMyOrders } from "@/service/order.service";
import { Orders } from "@/types/Types";
import React, { useEffect, useState } from "react";

const page = () => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null); // State to track selected order
    const userId = JSON.parse(localStorage.getItem("veggies:user")!)?.data?._id;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await fetchMyOrders(userId);
            console.log("response", response);
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = (orderId: string) => {
        setSelectedOrder(selectedOrder === orderId ? null : orderId); // Toggle selected order
    };

    return (
        <section className="bg-white py-4 antialiased dark:bg-gray-900 md:py-20">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            My orders
                        </h2>
                    </div>

                    <div className="mt-6 flow-root sm:mt-8">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="flex flex-wrap items-center gap-y-4 py-6"
                                >
                                    {/* Order ID */}
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                            Order ID:
                                        </dt>
                                        <dd className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                                            <a href="#" className="hover:underline">
                                                {order._id.substring(0, 8)}...
                                            </a>
                                        </dd>
                                    </dl>

                                    {/* Date */}
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                            Date:
                                        </dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </dd>
                                    </dl>

                                    {/* Price */}
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                            Price:
                                        </dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            ₹{order.total}
                                        </dd>
                                    </dl>

                                    {/* Status */}
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                            Status:
                                        </dt>
                                        <dd
                                            className={`me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-base font-medium 
      ${order.status === "Processing"
                                                    ? "text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-300"
                                                    : order.status === "Shipped"
                                                        ? "text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
                                                        : order.status === "Delivered"
                                                            ? "text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300"
                                                            : "text-gray-800 bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
                                                }`}
                                        >
                                            {order.status}
                                        </dd>
                                    </dl>

                                    {/* Actions */}
                                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                        {/* <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">
                                            Cancel order
                                        </button> */}
                                        <button
                                            onClick={() => handleViewDetails(order._id)}
                                            className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                                        >
                                            View details
                                        </button>
                                    </div>

                                    {/* Order Items and Shipping Info - Conditionally render based on selectedOrder */}
                                    {selectedOrder === order._id && (
                                        <>
                                            <CommonModal
                                                isOpen={selectedOrder === order._id}
                                                onClose={() => setSelectedOrder(null)}
                                            >
                                                {/* Order Items */}
                                                <div className="p-4 w-full">
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Order Items:
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                                                        {order.orderItems.map((item) => (
                                                            <div
                                                                key={item.productId}
                                                                className="flex items-center gap-4"
                                                            >
                                                                <img
                                                                    src={item.photo}
                                                                    alt={item.name}
                                                                    className="w-16 h-16 object-cover rounded-md"
                                                                />
                                                                <div className="flex flex-col">
                                                                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                                                                        {item.name}
                                                                    </span>
                                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                        ₹{item.price} x {item.quantity}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Shipping Info */}
                                                <div className="mt-4 w-full">
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Shipping Information:
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {order.shippingInfo.address},{" "}
                                                        {order.shippingInfo.city},{" "}
                                                        {order.shippingInfo.state},{" "}
                                                        {order.shippingInfo.country} -{" "}
                                                        {order.shippingInfo.pincode}
                                                    </p>
                                                </div>
                                            </CommonModal>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;
