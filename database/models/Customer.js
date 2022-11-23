const mongoose = require("mongoose");

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    validate: [validateEmail, "Ingrese un email válido."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Ingrese un email válido.",
    ],
  },
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  status: {
    type: String,
    require: true,
    trim: true,
  },
  maxCredits: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
