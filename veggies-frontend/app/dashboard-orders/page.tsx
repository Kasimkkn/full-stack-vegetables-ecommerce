"use client";

import ConfirmModal from "@/components/dashboard/ConfirmModal";
import OrdersTable from "@/components/dashboard/OrdersTable";
import ProductTable from "@/components/dashboard/ProductTable";
import AdminSidebar from "@/components/dashboard/Sidebar";
import TopCards from "@/components/dashboard/TopCards";
import UserTable from "@/components/dashboard/UserTable";
import CommonModal from "@/components/ui/CommonModal";
import { deleteOrder, fetchAllOrders, processOrder } from "@/service/order.service";
import { createProduct, deleteProduct, fetchAdminProducts, updateProduct } from "@/service/products.service";
import { deleteUser, getAllUsers } from "@/service/user.service";
import { Orders, Product, Users } from "@/types/Types";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminOrders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<Orders[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState("");
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmModalAction, setConfirmModalAction] = useState<(() => void) | null>(null);
    const [confirmModalMessage, setConfirmModalMessage] = useState("");


    const adminId = JSON.parse(localStorage.getItem("veggies:user")!)?.data?._id;

    useEffect(() => {
        if (!adminId) {
            router.push("/login");
        }
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAllOrders(adminId);
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateOrderStatus = async (id: string, status: "Processing" | "Shipped" | "Delivered") => {
        setActionLoading(true);
        setActionMessage("Updating Order Status...");
        setIsActionModalOpen(true);
        try {
            await processOrder(id, status, adminId);
            fetchOrders();
        } catch (error) {
            console.error("Error updating order status:", error);
        } finally {
            setActionLoading(false);
            setIsActionModalOpen(false);
        }
    };

    const handleDeleteOrder = (id: string) => {
        setConfirmModalMessage("Are you sure you want to delete this order?");
        setConfirmModalAction(() => async () => {
            setActionLoading(true);
            setActionMessage("Deleting Order...");
            setIsActionModalOpen(true);
            try {
                await deleteOrder(id, adminId);
                fetchOrders();
            } catch (error) {
                console.error("Error deleting order:", error);
            } finally {
                setActionLoading(false);
                setIsActionModalOpen(false);
            }
            setIsConfirmModalOpen(false);
        });
        setIsConfirmModalOpen(true);
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-4 left-4 md:hidden z-50 p-2 bg-gray-300 rounded-full text-gray-800"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-6 p-4">
                {isLoading ? (
                    <p>Loading orders...</p>
                ) : (
                    <OrdersTable
                        orders={orders}
                        onUpdateStatus={handleUpdateOrderStatus}
                        onDelete={handleDeleteOrder}
                    />
                )}

            </div>

            {/* Loading Modal */}
            <CommonModal isOpen={isActionModalOpen}>
                <div className="flex flex-col items-center justify-center space-y-4 p-6">
                    <div className="loader border-t-transparent border-4 border-gray-400 rounded-full w-12 h-12 animate-spin"></div>
                    <p className="text-lg font-semibold">{actionMessage}</p>
                </div>
            </CommonModal>
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                title="Confirm Action"
                message={confirmModalMessage}
                onConfirm={() => {
                    if (confirmModalAction) confirmModalAction();
                }}
                onCancel={() => setIsConfirmModalOpen(false)}
            />

        </div>
    );
};

export default AdminOrders;
