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

const AdminUsers = () => {
    const router = useRouter();
    const [users, setUsers] = useState<Users[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState("");
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<Users | null>(null);
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
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await getAllUsers(adminId);
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };



    const handleUpdateUser = (user: Users) => {
        setUserToEdit(user);
        setIsModalOpen(true); // You can reuse the modal or create a new one for user edits
    };

    const handleDeleteUser = (id: string) => {
        setConfirmModalMessage("Are you sure you want to delete this user?");
        setConfirmModalAction(() => async () => {
            setActionLoading(true);
            setActionMessage("Deleting User...");
            setIsActionModalOpen(true);
            try {
                await deleteUser(id, adminId);
                fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
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
                    <p>Loading users...</p>
                ) : (
                    <UserTable
                        users={users}
                        onEdit={handleUpdateUser}
                        onDelete={handleDeleteUser}
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

export default AdminUsers;
