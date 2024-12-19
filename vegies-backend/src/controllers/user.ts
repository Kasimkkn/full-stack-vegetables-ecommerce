import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { LoginRequestBody, NewUserRequestBody, UpdateUserRequestBody } from "../types/types.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import generateToken from "../utils/generateToken.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    if (!name || !email || !password) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }

    // Create a new user
    user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
      token, // Send token to the frontend
      data: user
    });
  }
);


export const loginUser = TryCatch(
  async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password", 400));
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.name}`,
      token, // Send token to the frontend
      data: user
    });
  }
);


export const updateUser = TryCatch(
  async (
    req: Request<{}, {}, UpdateUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { _id, ...updateData } = req.body;

    // Validate required field
    if (!_id) {
      return next(new ErrorHandler("User ID is required", 400));
    }

    // Ensure there is data to update
    if (Object.keys(updateData).length === 0) {
      return next(new ErrorHandler("No data provided for update", 400));
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(_id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  }
);


export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    data: users,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  return res.status(200).json({
    success: true,
    data: user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
