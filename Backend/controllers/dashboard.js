const CartModel = require("../models/cart");
const User = require("../models/User");
const Category = require("../models/Category_Schema");
const Product = require("../models/product");
const bcrypt = require("bcrypt");


let getTotalRevenueForMonth = async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const totalRevenue = await CartModel.aggregate([
            {
                $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } }
            },
            {
                $group: { _id: null, totalRevenue: { $sum: "$total" } }
            }
        ]);

        res.status(200).json({ totalRevenue: totalRevenue[0]?.totalRevenue || 0 });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
const getUserCount = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const customerCount = await User.countDocuments({ role: "user" });
        const vendorCount = await User.countDocuments({ role: "vendor" });

        res.json({
            message: "Counts retrieved successfully",
            customerCount,
            vendorCount
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getRevenueTrends = async (req, res) => {
    try {
        const revenueTrends = await CartModel.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalRevenue: { $sum: "$total" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        res.json(revenueTrends.map(item => ({
            month: months[item._id - 1],
            totalRevenue: item.totalRevenue
        })));
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getCategoryProductCounts = async (req, res) => {
    try {
        const categoryCounts = await Product.aggregate([
            { $group: { _id: "$categoryId", productCount: { $sum: 1 } } },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$category" },
            { $project: { categoryName: "$category.name", productCount: 1 } }
        ]);

        res.json(categoryCounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const GetOrders = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json("Only Admins");
        }

        let orders = await CartModel.find().populate("userID", "name email").lean();

        let formattedOrders = orders.map(order => ({
            orderID: order._id,
            userName: order.userID?.name || "Unknown",
            userEmail: order.userID?.email || "Unknown",
            totalItems: order.orderItems.reduce((sum, item) => sum + item.quantity, 0),
            totalAmount: order.total,
            status: order.status,
            paymentMethod: order.paymentMethod,
            createdAt: order.createdAt
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const updateAdminProfile = async (req, res) => {
    try {
      if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const adminId = req.user.id;
      const { name, email, mobileNumber, homeAddress, currentPassword, newPassword } = req.body;
  
      const admin = await User.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      if (currentPassword && newPassword) {
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Current password is incorrect" });
        }
  
        if (newPassword.length < 8) {
          return res.status(400).json({ message: "New password must be at least 8 characters long" });
        }
  
        admin.password = await bcrypt.hash(newPassword, 10);
      }
  
      if (name) admin.name = name;
      if (email) admin.email = email;
      if (mobileNumber) admin.mobileNumber = mobileNumber;
      if (homeAddress) admin.homeAddress = homeAddress;
  
      await admin.save();
      res.json({ message: "Admin profile updated successfully", admin });
    } catch (error) {
       
          
          res.status(500).json({ message: "Server error", error: error.message });
        }
  };
 

module.exports = { getTotalRevenueForMonth, getUserCount, getRevenueTrends, getCategoryProductCounts, GetOrders , updateAdminProfile  };
