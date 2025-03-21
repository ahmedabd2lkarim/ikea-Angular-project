// require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/Category_Schema");
const categoriesData = require("../categoriesData.json");
// const mongoURL = process.env.MONGO_URL;
mongoose.connect("mongodb+srv://fatmaelzahraanagy:1Oorcq8hKPsky6Pe@cluster0.gvqfb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(async () => {
        await Category.deleteMany(); 
        await Category.insertMany(categoriesData);
        console.log("Categories imported successfully");
        process.exit();
    })
    .catch(error => {
        console.error("Error importing categories", error);
        process.exit(1);
    });
