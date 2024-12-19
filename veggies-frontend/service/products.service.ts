import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/product";

// Fetch admin products
export const fetchAdminProducts = async (adminId: string) => {
    return axios.get(`${BASE_URL}/admin-products`, { params: { id: adminId } });
};

// Create a new product
export const createProduct = async (data: FormData, adminId: string) => {
    return axios.post(`${BASE_URL}/new`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { id: adminId },
    });
};

// Update an existing product
export const updateProduct = async (id: number, data: FormData, adminId: string) => {
    return axios.put(`${BASE_URL}/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { id: adminId },
    });
};

// Delete a product
export const deleteProduct = async (id: number, adminId: string) => {
    return axios.delete(`${BASE_URL}/${id}`, { params: { id: adminId } });
};

// Fetch all products with filters
export const fetchAllProducts = async (filters?: Record<string, any>) => {
    return axios.get(`${BASE_URL}/all`, { params: filters });
};

// Fetch the latest 10 products
export const fetchLatestProducts = async () => {
    return axios.get(`${BASE_URL}/latest`);
};

// Fetch all unique categories
export const fetchAllCategories = async () => {
    return axios.get(`${BASE_URL}/categories`);
};

// Fetch a single product by its ID
export const fetchSingleProduct = async (id: number) => {
    return axios.get(`${BASE_URL}/${id}`);
};
