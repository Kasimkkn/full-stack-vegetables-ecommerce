import React from "react";
import { Orders } from "@/types/Types";

interface OrdersTableProps {
    orders: Orders[];
    onView?: (order: Orders) => void;
    onDelete: (id: string) => void;
    onUpdateStatus: (id: string, status: Orders["status"]) => void;
}

const OrdersTable = ({ orders, onView, onDelete, onUpdateStatus }: OrdersTableProps) => {
    console.log("orders", orders);
    return (
        <div className="bg-white shadow rounded-lg p-4 overflow-auto flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">Orders</h2>
            </div>
            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">User</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Created At</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order._id} className="border-t">
                            <td className="px-4 py-2">{order._id}</td>
                            <td className="px-4 py-2">{order.user.name}</td>
                            <td className="px-4 py-2">₹{order.total.toFixed(2)}</td>
                            <td className="px-4 py-2">
                                {order.status !== "Delivered" ? (
                                    <button
                                        onClick={() =>
                                            onUpdateStatus(
                                                order._id,
                                                order.status === "Processing" ? "Shipped" : "Delivered"
                                            )
                                        }
                                        className={`px-2 py-1 rounded bg-white ${order.status === "Processing"
                                            ? "text-blue-500 border-blue-500"
                                            : "text-green-500 border-green-500"
                                            } border`}
                                    >
                                        {order.status === "Processing"
                                            ? "Mark as Shipped"
                                            : "Mark as Delivered"}
                                    </button>
                                ) : (
                                    <span className="text-gray-500 bg-white px-2 py-1 rounded border border-gray-300">
                                        Delivered
                                    </span>
                                )}
                            </td>

                            <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString('en-US')}</td>
                            <td className="px-4 py-2 flex flex-col gap-2 sm:flex-row">
                                {onView && (
                                    <button
                                        onClick={() => onView(order)}
                                        className="bg-mainBg text-white px-2 py-1 rounded"
                                    >
                                        View
                                    </button>
                                )}
                                <button
                                    onClick={() => onDelete(order._id)}
                                    className="bg-black text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
