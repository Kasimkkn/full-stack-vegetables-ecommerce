import mongoose from "mongoose";

interface IProduct extends mongoose.Document {
  name: string;
  photo: string; // Single photo string instead of array
  price: number;
  stock: number;
  description?: string;
  category: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  isWishlisted?: boolean;
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
    isWishlisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to validate stock
schema.pre("save", function (next) {
  if (this.stock < 0) {
    this.stock = 0;
  }
  next();
});

// Pre-update middleware to validate stock
schema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // Ensure the update object is of type UpdateQuery
  if (update && typeof update === "object" && !Array.isArray(update)) {
    if (typeof update.stock === "number" && update.stock < 0) {
      update.stock = 0;
    }
  }

  next();
});


export const Product = mongoose.model<IProduct>("Product", schema);
