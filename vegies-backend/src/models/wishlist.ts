import mongoose from "mongoose";

interface IWishlist extends Document {
    item: [{
        name: string;
        photo: string;
        price: number;
        productId: mongoose.Types.ObjectId;
    }]
    userId: mongoose.Types.ObjectId
}


const schema = new mongoose.Schema({
    item: [{
        name: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        productId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
});

export const Wishlist = mongoose.model<IWishlist>("Wishlist", schema);