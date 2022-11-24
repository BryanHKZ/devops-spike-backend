const CustomerRepository = require("../../../database/repository/CustomerRepository");

const customerServices = new CustomerRepository();

module.exports = {
  createCustomer: async (req, res) => {
    try {
      const customer = await customerServices.newCustomer(req.body);

      if (customer.code === 400) {
        return res.status(customer.code).json({ message: customer.message });
      }

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
        async (error, token) => {
          if (error) throw error;

          res.json({ token, customer });
        }
      );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error con el servidor :(" });
    }
  },
  getCustomer: async (req, res) => {
    try {
      const customer = await customerServices.getCustomer(req.params.id);
      if (!customer)
        return res.status(404).json({ message: "Cliente no encontrado" });
      return res.status(201).json(customer);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error con el servidor :(" });
    }
  },
  removeCustomer: async (req, res) => {
    try {
      await customerServices.removeCustomer(req.params.id);

      return res
        .status(201)
        .json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error con el servidor :(" });
    }
  },
  updateCustomer: async (req, res) => {
    try {
      if (!req.params.id)
        return res.status(400).json({
          message: "La ID del Cliente es requerida",
        });
      const cs = await customerServices.updateCustomer(req.params.id, req.body);

      if (cs.message && cs.code === 404) {
        return res.status(cs.code).json({ message: cs.message });
      }

      return res.status(200).json(cs);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error con el servidor :(" });
    }
  },
  getAllCustomers: async (req, res) => {
    try {
      const filter = req.query.name;
      let list = await customerServices.getAllCustomers(filter);

      return res.status(200).json(list);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error con el servidor :(" });
    }
  },
};
