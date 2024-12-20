import mongoose from "mongoose";

interface IOrderItem extends Document {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: mongoose.Types.ObjectId;
}


interface IOrder extends Document {
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
  };
  user: string;
  subtotal?: number;
  tax?: number;
  shippingCharges?: number;
  discount?: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  orderItems: IOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}



const schema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },

    user: {
      type: String,
      ref: "User",
      required: true,
    },

    subtotal: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    shippingCharges: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },

    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>("Order", schema);