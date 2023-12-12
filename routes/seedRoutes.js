import express from "express";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  try {
    await Product.deleteMany({}); // Remove all documents in the collection
    const createdProducts = await Product.insertMany(data.products);

    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    // Combine the data and send it in a single response

    res.send({ createdProducts, createdUsers });
  } catch (error) {
    res.status(500).json({ message: "Error seeding data." });
  }
});

export default seedRouter;
