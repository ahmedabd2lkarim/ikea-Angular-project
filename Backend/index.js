const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const cartRoutes=require('./routes/cart');
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const productRoutes = require('./routes/productRoutes');
const categoryRoutes=require('./routes/categoryRoutes');
const dashboardRoutes = require("./routes/dashboard");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use((err,req,res,next)=>{
    res.json(err).status(500)
})

app.use("/api/cart",cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/products', productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
