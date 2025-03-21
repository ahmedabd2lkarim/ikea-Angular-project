const express = require("express");
const router = express.Router();
const { getTotalRevenueForMonth ,getUserCount,getRevenueTrends,getCategoryProductCounts,GetOrders,updateAdminProfile} = require("../controllers/dashboard");
const { auth, isAdmin } = require("../middleware/auth");

router.get("/total-revenue", auth, isAdmin, getTotalRevenueForMonth);
router.get("/user-count", auth, isAdmin, getUserCount);
router.get("/get-revenue", auth, isAdmin, getRevenueTrends);
router.get("/product-counts",auth, isAdmin, getCategoryProductCounts);
router.get("/get-details",auth, isAdmin, GetOrders);
router.patch("/update-Admin",auth, isAdmin, updateAdminProfile);



module.exports = router;
