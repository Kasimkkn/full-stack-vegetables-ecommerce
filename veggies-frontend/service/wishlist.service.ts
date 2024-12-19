import axios from "axios";

const WISHLIST_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Add a product to the wishlist
export const addToWishlist = async (data: { productId: string, userId: string }) => {
    return axios.post(`${WISHLIST_URL}/wishlist/add-to-wishlist`, data);
};

// Get the wishlist of a specific user
export const getWishlist = async (userId: string) => {
    return axios.get(`${WISHLIST_URL}/wishlist/get-wishlist/${userId}`);
};

// Remove a product from the wishlist
export const removeFromWishlist = async (data: { productId: string, userId: string }) => {
    return axios.delete(`${WISHLIST_URL}/wishlist/remove-from-wishlist`, { data });
};
