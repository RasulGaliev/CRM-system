import express from "express";
const app = express();

import colors from "colors";
colors.enable();

import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
connectDB();

import productRoutes from "./api/routes/products.js";
import orderRoutes from "./api/routes/orders.js";

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
