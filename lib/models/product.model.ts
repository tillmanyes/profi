import mongoose, { mongo } from "mongoose";
import { getLowestPrice } from "../utils";

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true},
    currency: { type: String, required: true, unique: true},
    image: { type: String, required: true, unique: true},
    title: { type: String, required: true, unique: true},
    currentPrice: { type: Number, required: true, unique: true},
    originalPrice: { type: Number, required: true, unique: true},
    priceHistory: [
        {
            price: { type: Number, required: true },
            data: { type: Date, default: Date.now }
        },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    lisOutOfStock: { type: Boolean, default: false },
    users: [
        {email: { type: String, required: true}}
    ], default: [],
    }, { timestamps: true })

    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

    export default Product