import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { Product } from "../models/product.js";
import { Wishlist } from "../models/wishlist.js";

// Add to Wishlist
export const addToWishlist = TryCatch(async (req: Request, res, next) => {
    const { productId, userId } = req.body;

    if (!productId)
        return next(new ErrorHandler("Please provide productId", 400));

    const product = await Product.findById(productId);

    if (!product)
        return next(new ErrorHandler("Product not found", 404));

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
        const newWishlist = await Wishlist.create({
            item: [{ productId, name: product.name, photo: product.photo, price: product.price }],
            userId,
        });

        return res.status(201).json({
            success: true,
            message: "Product added to wishlist",
            wishlist: newWishlist
        });
    } else {
        const existingItemIndex = wishlist.item.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (existingItemIndex !== -1) {
            return res.status(400).json({
                success: false,
                message: "Product is already in your wishlist"
            });
        }

        wishlist.item.push({
            productId,
            name: product.name,
            photo: product.photo,
            price: product.price,
        });

        await wishlist.save();

        return res.status(201).json({
            success: true,
            message: "Product added to wishlist",
            wishlist: wishlist
        });
    }
});

// Remove from Wishlist
export const removeFromWishlist = TryCatch(async (req: Request, res, next) => {
    const { productId, userId } = req.body;

    if (!productId)
        return next(new ErrorHandler("Please provide productId", 400));

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist)
        return next(new ErrorHandler("Wishlist not found", 404));

    const existingItemIndex = wishlist.item.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (existingItemIndex === -1)
        return next(new ErrorHandler("Product not found in wishlist", 404));

    wishlist.item.splice(existingItemIndex, 1); // Remove the item from the array

    await wishlist.save();

    return res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
        wishlist: wishlist
    });
});

// Get Wishlist Items
export const getWishlist = TryCatch(async (req: Request, res, next) => {
    console.log('req.params', req.params);
    const { userId } = req.params;

    if (!userId)
        return next(new ErrorHandler("Please provide userId", 400));

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist)
        return next(new ErrorHandler("Wishlist not found", 404));

    return res.status(200).json({
        success: true,
        message: "Wishlist fetched successfully",
        wishlist: wishlist
    });
});
