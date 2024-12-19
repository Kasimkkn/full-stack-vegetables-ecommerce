import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/user";

// Create a new user
export const createUser = async (data: FormData) => {
    return axios.post(`${BASE_URL}/new`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Login a user
export const loginUser = async (data: { email: string; password: string }) => {
    return axios.post(`${BASE_URL}/login`, data);
};

// Update an existing user
export const updateUser = async (id: string, data: FormData) => {
    return axios.put(`${BASE_URL}/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Get all users (admin-only access)
export const getAllUsers = async (adminId: string) => {
    return axios.get(`${BASE_URL}/all`, { params: { id: adminId } });
};

// Get a single user by ID
export const getUser = async (id: string) => {
    return axios.get(`${BASE_URL}/${id}`);
};

// Delete a user by ID (admin-only access)
export const deleteUser = async (id: string, adminId: string) => {
    return axios.delete(`${BASE_URL}/${id}`, { params: { id: adminId } });
};
