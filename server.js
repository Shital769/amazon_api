import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import uploadRouter from "./routes/uploadRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected.");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.set('trust proxy', 1)
app.get('/ip', (request, response) => response.send(request.ip))

app.get('/x-forwarded-for', (request, response) => response.send(request.headers['x-forwarded-for']))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/api/keys/google", (req, res) => {
  // res.send({ key: process.env.GOOGLE_API_KEY || "" });
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Google API key not configured." });
  }

  res.json({ key: apiKey });
});

app.use("/api/upload", uploadRouter);
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Your Server is running at http://localhost:${port}`);
});
