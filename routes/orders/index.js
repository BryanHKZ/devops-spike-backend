const express = require("express");
const api = express.Router();
const auth = require("../../middlewares/auth");

const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../../app/controller/order");

api.post("/order", auth, createOrder);
api.get("/order", auth, getOrders);
api.get("/order/:id", auth, getOrderById);

module.exports = api;
