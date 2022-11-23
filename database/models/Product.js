const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  code: {
    type: Number,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
    trim: true,
  },
  status: {
    type: String,
    require: true,
    trim: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
