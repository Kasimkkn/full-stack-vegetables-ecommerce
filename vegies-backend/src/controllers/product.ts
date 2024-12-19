import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import {
  BaseQuery,
  NewProductRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
import { getPublicIdFromUrl, invalidateCache } from "../utils/features.js";
import cloudinary from 'cloudinary';

export const getlatestProducts = TryCatch(async (req, res, next) => {

  let products;

  if (myCache.has("latest-products")) {
    products = JSON.parse(myCache.get("latest-products") as string);
  }
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(4);
    myCache.set("latest-products", JSON.stringify(products));
  }
  return res.status(200).json({
    success: true,
    data: products,
  });

})
export const getSingleProduct = TryCatch(async (req, res, next) => {

  let product;
  const id = req.params.id;
  if (myCache.has(`product-${id}`))
    product = JSON.parse(myCache.get(`product-${id}`) as string);
  else {
    product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Product Not Found", 404));

    myCache.set(`product-${id}`, JSON.stringify(product));
  }

  return res.status(200).json({
    success: true,
    product,
  });
})
export const getAdminProducts = TryCatch(async (req, res, next) => {
  let products;
  if (myCache.has("all-products"))
    products = JSON.parse(myCache.get("all-products") as string);
  else {
    products = await Product.find({});
    myCache.set("all-products", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
})
export const getAllCategories = TryCatch(async (req, res, next) => {
  let categories;

  if (myCache.has("categories"))
    categories = JSON.parse(myCache.get("categories") as string);
  else {
    categories = await Product.distinct("category");
    myCache.set("categories", JSON.stringify(categories));
  }

  return res.status(200).json({
    success: true,
    categories,
  });
})
export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, category, description, stock } = req.body;
    const photo = req.file as Express.Multer.File; // Single photo upload

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

    if (!name || !price || !stock || !category) {
      return next(new ErrorHandler("Please enter All Fields", 400));
    }

    try {
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(photo.path, {
        folder: "veggies-products",
      });

      const newproduct = await Product.create({
        name,
        price,
        description,
        stock,
        category: category.toLowerCase(),
        photo: cloudinaryResponse.secure_url, // Store single photo URL
      });

      invalidateCache({ product: true, admin: true });

      return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
        data: newproduct
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to create product", 500));
    }
  }
);
export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  console.log('id', id)
  const { name, price, category, description, stock } = req.body;
  const photo = req.file as Express.Multer.File; // Single photo upload
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (photo) {
    console.log('photo', photo);
    if (product.photo) {
      await cloudinary.v2.uploader.destroy(getPublicIdFromUrl(product.photo));
    }

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(photo.path, {
      folder: "veggies-products",
    });
    product.photo = cloudinaryResponse.secure_url; // Update with new photo URL
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  if (description) product.description = description;

  await product.save();

  invalidateCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
    data: product
  });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  // Delete photo from Cloudinary
  if (product.photo) {
    await cloudinary.v2.uploader.destroy(getPublicIdFromUrl(product.photo));
  }

  await product.deleteOne();

  invalidateCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});
export const getAllProducts = TryCatch(async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {

  const { search, sort, category, price, } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
  const skip = (page - 1) * limit;

  const baseQuery: BaseQuery = {};

  if (search) {
    baseQuery.name = {
      $regex: search,
      $options: "i",
    };
  }
  if (price) {
    baseQuery.price = {
      $lte: Number(price),
    };
  }

  if (category) baseQuery.category = category;

  const productsPromise = Product.find(baseQuery).sort(sort && { price: sort === "asc" ? 1 : -1 }).limit(limit).skip(skip);

  const [products, filteredOnlyProduct] = await Promise.all([
    productsPromise,
    Product.find(baseQuery),
  ]);

  const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

  return res.status(200).json({
    success: true,
    products,
    totalPage,
  });
});

