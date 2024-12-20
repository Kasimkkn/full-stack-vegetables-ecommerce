import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Fetch admin products
export const fetchAdminProducts = async (adminId: string) => {
    return axios.get(`${BASE_URL}/product/admin-products`, { params: { id: adminId } });
};

// Create a new product
export const createProduct = async (data: FormData, adminId: string) => {
    return axios.post(`${BASE_URL}/product/new`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { id: adminId },
    });
};

// Update an existing product
export const updateProduct = async (id: string, data: FormData, adminId: string) => {
    return axios.put(`${BASE_URL}/product/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { id: adminId },
    });
};

// Delete a product
export const deleteProduct = async (id: string, adminId: string) => {
    return axios.delete(`${BASE_URL}/product/${id}`, { params: { id: adminId } });
};

// Fetch all products with filters
export const fetchAllProducts = async (page: number) => {
    return axios.get(`${BASE_URL}/product/all`, { params: { page } });
};

// Fetch the latest 10 products
export const fetchLatestProducts = async () => {
    return axios.get(`${BASE_URL}/product/latest`);
};

// Fetch all unique categories
export const fetchAllCategories = async () => {
    return axios.get(`${BASE_URL}/product/categories`);
};

// Fetch a single product by its ID
export const fetchSingleProduct = async (id: number) => {
    return axios.get(`${BASE_URL}/product/${id}`);
};
