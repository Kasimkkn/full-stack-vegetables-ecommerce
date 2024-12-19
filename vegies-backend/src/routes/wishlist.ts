import express from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlist.js";

const router = express.Router();

router.post("/add-to-wishlist", addToWishlist);
router.delete("/remove-from-wishlist", removeFromWishlist);
router.get("/get-wishlist/:userId", getWishlist);

export default router;
