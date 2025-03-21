const CartModel = require("../models/cart");
const Product = require("../models/product");
//200 => ok              //201 => created
//202 => accepted        //400 => bad request
//401 => unauthorized    //403 => forbidden     //404 => not found
let getAllOrders = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json("Only Admins");
        }
        let orders = await CartModel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

let getOrdersByVendor = async (req, res) => {
    try {
        const vendorId = req.user.id;

        const vendorProducts = await Product.find({ vendorId }).select('_id');

        const productIds = vendorProducts.map(product => product._id);
        let orders = await CartModel.find({ 'orderItems.prdID': { $in: productIds } })
            .populate('userID', 'name email mobileNumber homeAddress')
            .populate({
                path: 'orderItems.prdID',
                model: 'Product',
                select: 'name price image vendorId'
            });

        orders.forEach((order) => {
            let orderItems = [], subTotal = 0;
            order.orderItems.forEach((item) => {
                if (String(item.prdID.vendorId) == vendorId) {
                    orderItems.push(item);
                    subTotal += (item.quantity * item.prdID.price.currentPrice)
                }
            })
            order.orderItems = orderItems;
            order.subTotal = subTotal;
            order.total = order.subTotal + order.shippingFee;
        })

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

let getCurrentUserOrder = async (req, res) => {
    try {
        let userOrder = await CartModel.find({ userID: req.user.id });
        res.status(200).json(userOrder);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

let deleteOrder = async (req, res) => {
    try {
        if (req.user.role !== 'user') {
            return res.status(403).json("Only Users can delete orders");
        }
        const { id } = req.params
        let order = await CartModel.findOneAndDelete({ _id: id, userID: req.user.id });
        if (!order) {
            return res.status(403).json({ message: "Users can delete thier orders only or order not found" });
        }
        res.status(200).json({ message: "order deleted" });
    } catch (error) {
        res.status(500).json({ message: "UServer error", error });
    }
}

let createOrder = async (req, res) => {
    try {
        if (req.user.role !== 'user') {
            return res.status(403).json("Only Users can create orders");
        }
        let subTotal = 0;
        let cart = [];
        let total = 0;
        const { orderItems, shippingFee } = req.body;
        if (orderItems.length < 1) {
            return res.status(400).json("No order Items provided")
        }
        for (let prd of orderItems) {
            let product = await Product.findById(prd.prdID);
            if (!product) {
                return res.status(400).json("No product found")
            }
            subTotal += (product.price.currentPrice * prd.quantity);
            let singleItem = { prdID: prd.prdID, quantity: prd.quantity };
            cart.push(singleItem);
        };
        total = subTotal + shippingFee;
        const order = await CartModel.create({ total, orderItems: cart, shippingFee, subTotal, userID: req.user.id });
        res.status(201).json({ message: "Order created", order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

let updateOrderStatus = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json("Only Admins can update order status");
        }
        const { id } = req.params;
        const status = req.body;
        if (!status) {
            return res.status(400).json("Status must be provided");
        }
        const order = await CartModel.findByIdAndUpdate(id, status, { runValidators: true, new: true });
        res.status(202).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

let updateOrderAmount = async (req, res) => {
    try {
        if (req.user.role !== 'user') {
            return res.status(403).json("Only Users can update order amount");
        }
        let subTotal = 0;
        let cart = [];
        const { id } = req.params;
        const { prdID, quantity } = req.body;
        let newPro = await Product.findById(prdID);
        console.log(newPro);
        if (!newPro) {
            return res.status(400).json("No product found")
        }
        let order = await CartModel.findOne({ _id: id, userID: req.user.id });
        for (let prd of order.orderItems) {
            let product = await Product.findById(prd.prdID);
            let singleItem = {};
            if (prd.prdID != prdID) {
                subTotal += (product.price.currentPrice * prd.quantity);
                singleItem = { prdID: prd.prdID, quantity: prd.quantity };
            }
            else {
                subTotal += (product.price.currentPrice * quantity);
                singleItem = { prdID: prdID, quantity };
            }
            cart.push(singleItem);
        };
        order.total = subTotal + order.shippingFee;
        order.subTotal = subTotal;
        order.orderItems = cart;
        await order.save();
        res.status(202).json(order)
    } catch (error) {
        res.status(403).json({ message: "Users can update thier orders only", error });
    }
}

module.exports = {
    getAllOrders,
    getOrdersByVendor,
    getCurrentUserOrder,
    deleteOrder,
    createOrder,
    updateOrderStatus,
    updateOrderAmount
};