import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Create a new order
export const createNewOrder = async (data: any) => {
    return axios.post(`${BASE_URL}/order/new`, data, {
        headers: { "Content-Type": "application/json" },
    });
};

// Fetch logged-in user's orders
export const fetchMyOrders = async (userId: string) => {
    return axios.get(`${BASE_URL}/order/my?id=${userId}`, {
        headers: { "Content-Type": "application/json" },
    });
};

// Fetch all orders (admin only)
export const fetchAllOrders = async (adminId: string) => {
    return axios.get(`${BASE_URL}/order/all`, { params: { id: adminId } });
};

// Fetch a single order by ID
export const fetchSingleOrder = async (id: string) => {
    return axios.get(`${BASE_URL}/order/${id}`, {
        headers: { "Content-Type": "application/json" },
    });
};

// Process an order (admin only)
export const processOrder = async (id: string, status: string, adminId: string) => {
    return axios.put(
        `${BASE_URL}/order/${id}`,
        { status },
        { params: { id: adminId } }
    );
};

// Delete an order (admin only)
export const deleteOrder = async (id: string, adminId: string) => {
    return axios.delete(`${BASE_URL}/order/${id}`, { params: { id: adminId } });
};
