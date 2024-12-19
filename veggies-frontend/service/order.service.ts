import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/order";

// Create a new order
export const createNewOrder = async (data: any) => {
    return axios.post(`${BASE_URL}/new`, data, {
        headers: { "Content-Type": "application/json" },
    });
};

// Fetch logged-in user's orders
export const fetchMyOrders = async (userId: string) => {
    return axios.get(`${BASE_URL}/my?id=${userId}`, {
        headers: { "Content-Type": "application/json" },
    });
};

// Fetch all orders (admin only)
export const fetchAllOrders = async (adminId: string) => {
    return axios.get(`${BASE_URL}/all`, { params: { id: adminId } });
};

// Fetch a single order by ID
export const fetchSingleOrder = async (id: string) => {
    return axios.get(`${BASE_URL}/${id}`, {
        headers: { "Content-Type": "application/json" },
    });
};

// Process an order (admin only)
export const processOrder = async (id: string, status: string, adminId: string) => {
    return axios.put(
        `${BASE_URL}/${id}`,
        { status },
        { params: { id: adminId } }
    );
};

// Delete an order (admin only)
export const deleteOrder = async (id: string, adminId: string) => {
    return axios.delete(`${BASE_URL}/${id}`, { params: { id: adminId } });
};
