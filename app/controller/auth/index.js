const Customer = require("../../../database/models/Customer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let customer = await Customer.findOne({ email });

    if (!customer || customer.status === "DELETED")
      return res.status(400).json({ message: "El cliente no existe" });

    const passVerify = await bcryptjs.compare(password, customer.password);
    if (!passVerify)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    //Crear y firmar un JWT
    const payload = {
      customer: {
        id: customer.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 19200,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token, customer });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id).select(
      "-password"
    );
    res.json({ customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    req.body.password = await bcryptjs.hash(req.body.password, 10);
    const newCustomer = new Customer(req.body);

    const payload = {
      customer: {
        id: newCustomer.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 3600,
      },
      async (error, token) => {
        if (error) throw error;

        await newCustomer.save();

        res.json({ token, customer: newCustomer });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
