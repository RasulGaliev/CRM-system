import express from "express";
const app = express();

import colors from "colors";
colors.enable();

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
connectDB();

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

import cors from "cors";
app.use(cors())

import passport from "passport"
app.use(passport.initialize())

// import middleware from "./middleware/passport.js"
// middleware()

import morgan from "morgan";
app.use(morgan('dev'));


import authRouter from "./routes/auth.js";
import orderRouter from "./routes/order.js";
import categoryRouter from "./routes/category.js";
import positionRouter from "./routes/position.js";
import analyticsRouter from "./routes/analytics.js";

app.use('/api/auth', authRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/position', positionRouter);
app.use('/api/analytics', analyticsRouter);


app.use((req, res, next) => {
  const error = new Error("Not found!!!!!!!!!!!!");
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
