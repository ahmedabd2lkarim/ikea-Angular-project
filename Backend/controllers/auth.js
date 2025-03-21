
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const registerUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { name, email, password, role, storeName, storeAddress, mobileNumber, homeAddress } = req.body;

    if (role === "admin") {
      return res.status(403).json({ message: "Admin accounts cannot be created this way." });
    }

    if (role === "vendor" && (!storeName || !storeAddress)) {
      return res.status(400).json({ message: "Store name and address are required for vendors." });
    }
    if (role !== "vendor" && (!mobileNumber || !homeAddress)) {
      return res.status(400).json({ message: "Mobile number and home address are required for users and admins." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      storeName: role === "vendor" ? storeName : undefined,
      storeAddress: role === "vendor" ? storeAddress : undefined,
      mobileNumber,
      homeAddress
    });

    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully`, user: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5h" });

  res.json({ message: "Login successful", token, role: user.role });
};


const acceptVendor = async (req, res) => {

  const { vendorId } = req.params;
  const { isAccepted } = req.body;

  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const vendor = await User.findById(vendorId);
    if (!vendor || vendor.role !== "vendor") {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.isAccepted = isAccepted;
    await vendor.save();
    res.json({ message: `Vendor ${isAccepted ? "accepted" : "rejected"}`, vendor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {

    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.id.toString() === userId || req.user.role === "admin") {
      await User.findByIdAndDelete(userId);
      return res.json({ message: "User deleted successfully" });
    }

    return res.status(403).json({ message: "You can only delete yourself unless you are an admin." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};





const getAllUsers = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await User.find({ role: "user" });
    res.json({ message: "All users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllVendors = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const vendors = await User.find({ role: "vendor" });
    res.json({ message: "All vendors retrieved successfully", vendors });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getRequestingAdmin = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const admin = await User.findById(req.user.id);
    res.json({ message: "Requesting admin details", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User profile retrieved successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updates = req.body;
    if (updates.role) {
      return res.status(400).json({ message: "Role change not allowed." });
    }
    if (req.user.role === "vendor") {
      if (!updates.storeName || !updates.storeAddress) {
        return res.status(400).json({ message: "Vendors must have a store name and address." });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select("-password");

    res.json({ message: "User profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateAnyUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { userId } = req.params;
    const updates = req.body;
    if (updates.password) {
      return res.status(400).json({ message: "Password updates must be done through a password reset." });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateVendorProfile = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({ message: "Vendors only." });
    }

    const vendorId = req.user.id;
    const { currentPass, newPass } = req.body;

    let vendor = await User.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (currentPass && newPass) {
      const isValid = await bcrypt.compare(currentPass, vendor.password);
      if (!isValid) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

        vendor.password = await bcrypt.hash(newPass, 10);
    }
    await vendor.save();

    vendor = await User.findByIdAndUpdate(vendorId, req.body, { runValidators: true, new: true })

    res.json({ message: "Vendor profile updated successfully", vendor });
  } catch (error) {


    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, login, acceptVendor, deleteUser, getAllUsers, getAllVendors, getRequestingAdmin, getUserProfile, updateUserProfile, updateAnyUser, updateVendorProfile };

