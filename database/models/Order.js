const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  products: {
    type: Array,
    require: true,
  },
  idCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Customer",
  },
  addressCustomer: {
    type: String,
    require: true,
  },
  phoneCustomer: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
