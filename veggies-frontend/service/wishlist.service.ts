import axios from "axios";

const WISHLIST_URL = "http://localhost:4000/api/v1/wishlist";

// Add a product to the wishlist
export const addToWishlist = async (data: { productId: string, userId: string }) => {
    return axios.post(`${WISHLIST_URL}/add-to-wishlist`, data);
};

// Get the wishlist of a specific user
export const getWishlist = async (userId: string) => {
    return axios.get(`${WISHLIST_URL}/get-wishlist/${userId}`);
};

// Remove a product from the wishlist
export const removeFromWishlist = async (data: { productId: string, userId: string }) => {
    return axios.delete(`${WISHLIST_URL}/remove-from-wishlist`, { data });
};
