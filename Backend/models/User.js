const mongoose = require("mongoose");
const { validateEmail, validatePassword, validateMobileNumber } = require("../utils/validation");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, unique: true, match: validateEmail },
  password: {
    type: String, required: true, minlength: 8
  },
  role: { type: String, enum: ["user", "vendor", "admin"], default: "user" },
  isAccepted: { type: Boolean, default: false },
  storeName: { type: String, required: function () { return this.role === "vendor" } },
  storeAddress: { type: String, required: function () { return this.role === "vendor" } },
  mobileNumber: {
    type: String,
    required: true
  },
  homeAddress: {
    type: String,
    required: true
  },


});

module.exports = mongoose.model("User", userSchema);
