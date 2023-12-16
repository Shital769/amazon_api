import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";
import rateLimit from "express-rate-limit";

const productRouter = express.Router();

const getRouteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});
const isAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

productRouter.get("/", getRouteLimiter, async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

productRouter.post(
  "/",
  isAuthLimiter,
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: "sample-product  " + Date.now(),
      slug: "sample-name-" + Date.now(),
      image: "/images/p1.jpg",
      price: 99.99,
      category: "sample category",
      brand: "sample brand",
      countInStock: 20,
      rating: 0,
      numberOfReviews: 0,
      description: "This is a sample product for testing",
    });
    const product = await newProduct.save();
    res.send({ message: "Product Created", product });
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAuthLimiter,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    const product = await Product.findById(productId);
    console.log(product);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.images = req.body.images;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      await product.save();
      res.send({ message: "Product Updated!" });
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuthLimiter,
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.send({ message: "Product Deleted Successfully." });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/:id/reviews",
  isAuth,
  isAuthLimiter,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You have already submitted a review." });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();

      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numberOfReviews: product.numberOfReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);

const PAGE_SIZE = 3;
productRouter.get(
  "/admin",
  isAuthLimiter,
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  "/search",
  getRouteLimiter,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    // const brand = query.brand || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: { $regex: searchQuery, $options: "i" },
          }
        : {};

    const categoryFilter = category && category !== "all" ? { category } : {};

    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: { $gte: Number(rating) },
          }
        : {};

    // const brandFilter = brand && brand !== "all" ? { brand } : {};

    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              // 1-50
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
      // ...brandFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
      // ...brandFilter,
    });

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  "/categories",
  getRouteLimiter,
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

productRouter.get("/:id", getRouteLimiter, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productRouter;
