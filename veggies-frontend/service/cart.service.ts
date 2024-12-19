import axios from "axios";

const CART_URL = "http://localhost:4000/api/v1/cart";

export const addToCart = async (data: { productId: string; quantity: number, userId: string }) => {
    console.log('data', data)
    return axios.post(`${CART_URL}/add-to-cart`, data);
};

export const updateCartQuantity = async (data: { productId: string; quantity: number, userId: string }) => {
    return axios.put(`${CART_URL}/update-cart-quantity`, data);
};

export const removeFromCart = async (data: { productId: string, userId: string }) => {
    return axios.delete(`${CART_URL}/remove-from-cart`, { data });
};

export const getCart = async (userId: string) => {
    return axios.get(`${CART_URL}/get-cart/${userId}`);
};
