import express from "express";
import { addToCart, updateCartQuantity, removeFromCart, getCart } from "../controllers/cart.js";

const router = express.Router();

router.post("/add-to-cart", addToCart);
router.put("/update-cart-quantity", updateCartQuantity);
router.delete("/remove-from-cart", removeFromCart);
router.get("/get-cart/:userId", getCart);

export default router;
