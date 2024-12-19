import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";

export const addToCart = TryCatch(async (req: Request, res, next) => {
    const { productId, quantity, userId } = req.body;
    if (!productId || !quantity)
        return next(new ErrorHandler("Please provide productId and quantity", 400));

    const product = await Product.findById(productId);

    if (!product)
        return next(new ErrorHandler("Product not found", 404));

    if (product.stock === 0) {
        return res.status(200).json({
            success: false,
            message: "Product out of stock",
        });
    }
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
        const newCart = await Cart.create({
            item: [{ productId: productId, quantity: quantity, name: product.name, photo: product.photo, price: product.price }],
            userId: userId,
        });

        return res.status(201).json({
            success: true,
            message: "Product added to cart",
            cart: newCart
        });
    } else {
        const existingItemIndex = cart.item.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (existingItemIndex !== -1) {
            cart.item[existingItemIndex].quantity += quantity;

            await cart.save();

            return res.status(200).json({
                success: true,
                message: "Product quantity updated in cart",
                cart: cart
            });
        } else {
            cart.item.push({ productId: productId, quantity: quantity, name: product!.name, photo: product.photo, price: product.price });

            await cart.save();

            return res.status(201).json({
                success: true,
                message: "Product added to cart",
                cart: cart
            });
        }
    }

});


export const updateCartQuantity = TryCatch(async (req: Request, res, next) => {
    const { productId, quantity, userId } = req.body;

    console.log('productId', productId, 'quantity', quantity, 'userId', userId);
    if (!productId)
        return next(new ErrorHandler("Please provide productId ", 400));

    const cart = await Cart.findOne({ userId });

    if (!cart)
        return next(new ErrorHandler("Cart not found", 404));

    const product = await Product.findById(productId);

    if (!product)
        return next(new ErrorHandler("Product not found", 404));

    if (product.stock < quantity)
        return res.status(200).json({
            success: false,
            message: "Product out of stock",
            cart: cart
        });
    const existingItemIndex = cart.item.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (existingItemIndex === -1)
        return next(new ErrorHandler("Product not found in cart", 404));

    console.log('cart.item[existingItemIndex].quantity', cart.item[existingItemIndex].quantity);
    if (quantity === 0) {
        cart.item.splice(existingItemIndex, 1); // Remove the item from the array
        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: cart
        });
    }
    cart.item[existingItemIndex].quantity = quantity;

    await cart.save();

    return res.status(200).json({
        success: true,
        message: "Product quantity updated in cart",
        cart: cart
    });
});


export const removeFromCart = TryCatch(async (req: Request, res, next) => {
    const { productId, userId } = req.body;

    if (!productId)
        return next(new ErrorHandler("Please provide productId", 400));

    const cart = await Cart.findOne({ userId });

    if (!cart)
        return next(new ErrorHandler("Cart not found", 404));

    const existingItemIndex = cart.item.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (existingItemIndex === -1)
        return next(new ErrorHandler("Product not found in cart", 404));

    cart.item.splice(existingItemIndex, 1); // Remove the item from the array

    await cart.save();

    return res.status(200).json({
        success: true,
        message: "Product removed from cart",
        cart: cart
    });
});


export const getCart = TryCatch(async (req: Request, res, next) => {
    const { userId } = req.params;

    if (!userId)
        return next(new ErrorHandler("Please provide userId", 400));

    const cart = await Cart.findOne({ userId });

    if (!cart)
        return next(new ErrorHandler("Cart not found", 404));

    return res.status(200).json({
        success: true,
        message: "Cart fetched successfully",
        cart: cart
    });
});
