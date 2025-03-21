const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/auth");
const {getAllOrders,getOrderById,getOrdersByVendor,getCurrentUserOrder,deleteOrder,createOrder,updateOrderStatus,updateOrderAmount} = require('../controllers/cart')

router.get('/',auth,getAllOrders);     

router.get('/showAllMyOrders',auth,getCurrentUserOrder);

router.get('/vendor',auth,getOrdersByVendor)  

router.post('/newOrder',auth,createOrder);

router.delete('/:id',auth,deleteOrder);

router.patch('/amount/:id',auth,updateOrderAmount);

router.patch('/status/:id',auth,updateOrderStatus);
module.exports = router;