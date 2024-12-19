import mongoose from "mongoose";

interface ICart extends Document {
    item: [{
        name: string;
        photo: string;
        price: number;
        quantity: number;
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
        quantity: {
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

export const Cart = mongoose.model<ICart>("Cart", schema);