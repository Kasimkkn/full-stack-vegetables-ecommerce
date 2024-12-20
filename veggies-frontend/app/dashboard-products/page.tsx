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

const AdminProducts = () => {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState("");
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
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
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAdminProducts(adminId);
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleAddProduct = () => {
        setIsModalOpen(true);
        setProductToEdit(null);
    };
    const handleSaveProduct = async (newProduct: FormData) => {
        setActionLoading(true);
        setActionMessage(productToEdit ? "Updating Product..." : "Adding Product...");
        setIsActionModalOpen(true);
        try {
            if (productToEdit) {
                await updateProduct(productToEdit._id, newProduct, adminId);
            } else {
                await createProduct(newProduct, adminId);
            }
            fetchProducts();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving product:", error);
        } finally {
            setActionLoading(false);
            setIsActionModalOpen(false);
        }
    };

    const handleUpdateProduct = (product: Product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = (id: string) => {
        setConfirmModalMessage("Are you sure you want to delete this product?");
        setConfirmModalAction(() => async () => {
            setActionLoading(true);
            setActionMessage("Deleting Product...");
            setIsActionModalOpen(true);
            try {
                await deleteProduct(id, adminId);
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product:", error);
            } finally {
                setActionLoading(false);
                setIsActionModalOpen(false);
            }
            setIsConfirmModalOpen(false);
        });
        setIsConfirmModalOpen(true);
    };


    return (
        <div className="flex bg-gray-100 h-screen">
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
                    <p>Loading products...</p>
                ) : (
                    <ProductTable
                        products={products}
                        onEdit={handleUpdateProduct}
                        onDelete={handleDeleteProduct}
                        onAdd={handleAddProduct}
                    />
                )}
            </div>

            <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        handleSaveProduct(formData);
                    }}
                    className="bg-white p-6 shadow-lg rounded-lg space-y-4 max-w-lg w-full"
                >
                    <h2 className="text-xl font-bold">
                        {productToEdit ? "Edit Product" : "Add Product"}
                    </h2>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                        <div>
                            <label className="block text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={productToEdit?.name}
                                placeholder="Product Name"
                                className="block w-full rounded-lg border border-black bg-mainBg/10 p-2.5 text-sm text-mainBg focus:outline-none border-none focus:ring-1 focus:ring-black/20"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Product Price"
                                defaultValue={productToEdit?.price}
                                className="block w-full rounded-lg border border-black bg-mainBg/10 p-2.5 text-sm text-mainBg focus:outline-none border-none focus:ring-1 focus:ring-black/20"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Category</label>
                            <input
                                type="text"
                                name="category"
                                placeholder="Product Category"
                                defaultValue={productToEdit?.category}
                                className="block w-full rounded-lg border border-black bg-mainBg/10 p-2.5 text-sm text-mainBg focus:outline-none border-none focus:ring-1 focus:ring-black/20"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                placeholder="Product Stock"
                                defaultValue={productToEdit?.stock}
                                className="block w-full rounded-lg border border-black bg-mainBg/10 p-2.5 text-sm text-mainBg focus:outline-none border-none focus:ring-1 focus:ring-black/20"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            defaultValue={productToEdit?.description}
                            placeholder="Product Description (optional)"
                            className="block w-full rounded-lg border border-black bg-mainBg/10 p-2.5 text-sm text-mainBg focus:outline-none border-none focus:ring-1 focus:ring-black/20"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Photo</label>
                        <input
                            type="file"
                            name="photo"
                            className="block w-full rounded-lg border border-black bg-mainBg/10 p-2.5 text-sm text-mainBg focus:outline-none border-none focus:ring-1 focus:ring-black/20"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-mainBg text-white px-4 py-2 rounded w-full"
                    >
                        Save
                    </button>
                </form>
            </CommonModal>

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

export default AdminProducts;
