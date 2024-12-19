import mongoose from "mongoose";

interface IProduct extends Document {
  name: string;
  photo: string; // Single photo string instead of array
  price: number;
  stock: number;
  description?: string;
  category: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    description: {
      type: String,
      default: "",
    },
    photo: {
      type: String, // Single photo field
      required: [true, "Please enter Photo URL"],
    },
    price: {
      type: Number,
      required: [true, "Please enter Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter Stock"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, "Please enter Category"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProduct>("Product", schema);
