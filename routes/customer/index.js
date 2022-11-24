const express = require("express");
const api = express.Router();
const auth = require("../../middlewares/auth");
const {
  getCustomer,
  createCustomer,
  removeCustomer,
  updateCustomer,
  getAllCustomers,
} = require("../../app/controller/customer");

api.get("/customer", auth, getAllCustomers);
api.post("/customer", createCustomer);
api.get("/customer/:id", auth, getCustomer);
api.delete("/customer/:id", auth, removeCustomer);
api.put("/customer/:id", auth, updateCustomer);

module.exports = api;
