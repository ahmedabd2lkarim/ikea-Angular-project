const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getVendorProducts,
  getVendorProductById,
} = require("../controllers/productController");
const {auth} = require("../middleware/auth");
const router = express.Router();
router.post("/",auth, createProduct);
router.get("/vendorPros", auth, getVendorProducts);
router.get("/vendorPros/:id", auth, getVendorProductById);
router.get("/:id",auth, getProductById);
router.patch("/:id",auth, updateProduct);
router.delete("/:id",auth,  deleteProduct);
router.get("/cat/:categoryId",auth,  getProductsByCategory);
router.get("/",auth, getAllProducts);
module.exports = router;