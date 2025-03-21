const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique:true
    },
    price: {
        currency: {
            type: String,
        },
        currentPrice: {
            type: Number,
            required: true
        },
        discounted: {
            type: Boolean,
            default: false
        }
    },
    measurement: {
        type: String,
        required: true
    },
    typeName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    contextualImageUrl: {
        type: String,
        required: true
    },
    imageAlt: {
        type: String,
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
