const express = require("express");
const api = express.Router();
const auth = require("../../middlewares/auth");

const {
  createProduct,
  getProduct,
  getAllProducts,
  removeProduct,
  updateProduct,
} = require("../../app/controller/product");

api.post("/product", auth, createProduct);
api.get("/product/:id", auth, getProduct);
api.get("/product", auth, getAllProducts);
api.delete("/product/:id", auth, removeProduct);
api.put("/product/:id", auth, updateProduct);

module.exports = api;
