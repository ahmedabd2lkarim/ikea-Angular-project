const express = require("express");
const {auth} = require("../middleware/auth");
const checkRole = require("../middleware/permissions");
const { acceptVendor, deleteUser, getAllUsers , getAllVendors , getRequestingAdmin,updateAnyUser } = require("../controllers/auth");

const router = express.Router();
// console.log("AUTH:", auth);
// console.log("CHECKROLE:", checkRole);
// console.log("ACCEPTVENDOR:", acceptVendor);
// console.log("ACCEPTVENDOR:", getAllUsers);
// console.log("ACCEPTVENDOR:", getAllVendors);
// console.log("ACCEPTVENDOR:", getRequestingAdmin);


router.patch("/accept-vendor/:vendorId", auth, checkRole("admin"),acceptVendor);

router.delete("/delete-user/:userId", auth, deleteUser);

router.get("/users", auth, checkRole("admin"), getAllUsers);

router.get("/vendors", auth, checkRole("admin"), getAllVendors);

router.get("/admin-details", auth, checkRole("admin"), getRequestingAdmin);
router.patch("/update-user/:userId", auth, checkRole("admin"), updateAnyUser);


module.exports = router;
