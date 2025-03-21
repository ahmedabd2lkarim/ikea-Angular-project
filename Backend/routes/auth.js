const express = require("express");
const { registerUser, login,getUserProfile ,updateUserProfile,updateVendorProfile} = require("../controllers/auth");
const {auth} = require("../middleware/auth");


const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login);
router.get("/profile", auth, getUserProfile);
router.patch("/profile", auth, updateUserProfile);
router.patch("/updateVendor",auth, updateVendorProfile);


    
module.exports = router;
