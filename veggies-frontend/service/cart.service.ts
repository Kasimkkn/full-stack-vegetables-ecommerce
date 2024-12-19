import axios from "axios";

const CART_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const addToCart = async (data: { productId: string; quantity: number, userId: string }) => {
    console.log('data', data)
    return axios.post(`${CART_URL}/cart/add-to-cart`, data);
};

export const updateCartQuantity = async (data: { productId: string; quantity: number, userId: string }) => {
    return axios.put(`${CART_URL}/cart/update-cart-quantity`, data);
};

export const removeFromCart = async (data: { productId: string, userId: string }) => {
    return axios.delete(`${CART_URL}/cart/remove-from-cart`, { data });
};

export const getCart = async (userId: string) => {
    return axios.get(`${CART_URL}/cart/get-cart/${userId}`);
};
