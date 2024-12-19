import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
console.log('BASE_URL', BASE_URL)
// Create a new user
export const createUser = async (data: any) => {
    return axios.post(`${BASE_URL}/user/new`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Login a user
export const loginUser = async (data: { email: string; password: string }) => {
    return axios.post(`${BASE_URL}/user/login`, data);
};

// Update an existing user
export const updateUser = async (id: string, data: FormData) => {
    return axios.put(`${BASE_URL}/user/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Get all users (admin-only access)
export const getAllUsers = async (adminId: string) => {
    return axios.get(`${BASE_URL}/user/all`, { params: { id: adminId } });
};

// Get a single user by ID
export const getUser = async (id: string) => {
    return axios.get(`${BASE_URL}/user/${id}`);
};

// Delete a user by ID (admin-only access)
export const deleteUser = async (id: string, adminId: string) => {
    return axios.delete(`${BASE_URL}/user/${id}`, { params: { id: adminId } });
};
