const express = require("express");
const Joi = require("joi");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Middleware logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Fake database
let products = [
  { id: 1, name: "Watch", price: 2499 },
  { id: 2, name: "Shoes", price: 4999 }
];

let users = [];
let cart = [];
let orders = [];

// Validation schemas
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required()
});

const cartSchema = Joi.object({
  productId: Joi.number().required(),
  qty: Joi.number().required()
});

// PRODUCTS API
app.get("/products", (req, res) => {
  res.json(products);
});

// USERS API
app.post("/users", (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return next(error);

  users.push(req.body);
  res.send("User added");
});

// CART API
app.post("/cart", (req, res, next) => {
  const { error } = cartSchema.validate(req.body);
  if (error) return next(error);

  cart.push(req.body);
  res.send("Added to cart");
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

// ORDERS API
app.post("/orders", (req, res) => {
  orders.push(cart);
  cart = [];
  res.send("Order placed");
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.details
      ? err.details[0].message
      : err.message
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
