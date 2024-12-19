import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address?: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
  };
}

export interface UpdateUserRequestBody {
  _id: string;
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  address?: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
  };
}

export interface LoginRequestBody {
  email: string;
  password: string;
}


export interface NewProductRequestBody {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};


export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
}

export type InvalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
  userId?: string;
  orderId?: string;
  productId?: string | string[];
};

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
};

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: {
    _id: string;
    email: string;
  };
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}