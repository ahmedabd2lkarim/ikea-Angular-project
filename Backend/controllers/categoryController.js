const Category = require("../models/Category_Schema");
// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
// Create a new category (Admin only)
exports.createCategory = async (req, res) => {
    try {
        if (req.user.role != "admin") {
            return res.status(403).json({ message: "Only Admin can create categories" });
        }

        const { name, image, subs } = req.body;
        if (typeof name !== "string" || name.trim().length < 3) {
            return res.status(400).json({ message: "Category name must be a string with at least 3 characters" });
        }
        const urlRegex = /^(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*)$/;
        if (image && (typeof image !== "string" || !urlRegex.test(image))) {
            return res.status(400).json({ message: "Image must be a valid URL" });
        }
        const newCategory = new Category({ name, image, subs });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};

// Update a category (Admin only)
exports.updateCategory = async (req, res) => {
    try {

        if (req.user.role != "admin") {
            return res.status(403).json({ message: "Only Admin can update categories" });
        }


        const { name, image } = req.body;
        if (name && (typeof name !== "string" || name.trim().length < 3)) {
            return res.status(400).json({ message: "Category name must be a string with at least 3 characters" });
        }
        const urlRegex = /^(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*)$/;
        if (image && (typeof image !== "string" || !urlRegex.test(image))) {
            return res.status(400).json({ message: "Image must be a valid URL" });
        }

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id ,req.body ,{ new: true,runValidators: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a category (Admin only)
exports.deleteCategory = async (req, res) => {
    try {
        if (req.user.role != "admin") {
            return res.status(403).json({ message: "Only Admin can Delete category" });
        }
        const category = await Category.findOneAndDelete({ _id: req.params.id });
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
};
