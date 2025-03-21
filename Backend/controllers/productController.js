const Product = require("../models/product");

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        if (req.user.role !== "vendor") {
            return res.status(403).json("Only Vendors");
        }
        const product = new Product({ ...req.body, vendorId: req.user.id });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        if (req.user.role == "vendor") {
            return res.status(403).json("Only Admins and Users");
        }
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        if (req.user.role == "vendor") {
            return res.status(403).json("Only Admins and Users");
        }
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        if (req.user.role !== "vendor") {
            return res.status(403).json("Only Vendors");
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        if (req.user.role == "user") {
            return res.status(403).json("Only Admins and Vendors");
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get products by vendor ID
exports.getVendorProducts = async (req, res) => {
    try {
        if (req.user.role !== "vendor") {
            return res.status(403).json("Only Vendors");
        }
        const products = await Product.find({ vendorId: req.user.id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get vendor's product by ID
exports.getVendorProductById = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json("Only Vendors can access this endpoint");
    }

    const product = await Product.findOne({
      _id: req.params.id,
      vendorId: req.user.id,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or unauthorized" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by category ID
exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ categoryId: req.params.categoryId, vendorId: req.user.id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};