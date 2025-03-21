const mongoose = require('mongoose');
const orderItem=new mongoose.Schema({
    prdID:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    }  
})

const CartSchema =  new mongoose.Schema({
    total: Number,
    orderItems: [orderItem],
    userID:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    shippingFee:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending", "delivered", "cancelled" ,"shipped" , "processing"],
        default: "pending"
    },
    paymentMethod:{
        type:String,
        enum:["credit","cash"],
        default:"cash"
    },
    subTotal:Number
},{ timestamps: true });

const CartModel=mongoose.model('Cart',CartSchema);
module.exports = CartModel;