export interface NavLink {
    name: string;
    href: string;
    icon: React.ReactNode;
    isMobile?: boolean;
}

export type Product = {
    _id: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    quantity: number;
    description?: string
    isFeatured?: boolean
    isWishlisted?: boolean
};


export type Users = {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    role: string;
    address?: {
        address?: string;
        city?: string;
        state?: string;
        country?: string;
        pincode?: number;
    };
    createdAt: string;
    updatedAt: string;
};

export type Orders = {
    _id: string;
    shippingInfo: {
        address: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
    };
    user: {
        _id: string;
        name: string;
    };
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered';
    orderItems: [
        {
            name: string;
            photo: string;
            price: number;
            quantity: number;
            productId: string;
        }
    ];
    createdAt: Date;
    updatedAt: Date;
}

export type CartItems = {
    name: string,
    photo: string,
    price: number,
    quantity: number,
    productId: string,
    _id: string
}

export type WishlistItems = {
    name: string,
    photo: string,
    price: number,
    stock: number,
    productId: string,
    _id: string
}