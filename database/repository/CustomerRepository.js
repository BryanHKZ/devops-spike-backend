const Customer = require("../models/Customer");
const bcryptjs = require("bcryptjs");

class CustomerRepository {
  async newCustomer(data) {
    const emailRegistered = await Customer.find({ email: data.email });

    if (emailRegistered[0])
      return { code: 400, message: "Este email ya se encuentra registrado" };

    const usernameTaked = await Customer.find({ username: data.username });

    if (usernameTaked[0])
      return {
        code: 400,
        message: "Este nombre de usuario ya se encuentra registrado",
      };

    data.password = await bcryptjs.hash(data.password, 10);

    const customer = new Customer(data);
    try {
      const res = await customer.save();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async removeCustomer(id) {
    const customer = await Customer.findById(id);

    if (customer) {
      customer.status = "DELETED";
      customer.save();
    }
  }
  async getCustomer(id) {
    try {
      const customer = await Customer.findById(id);

      return customer;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllCustomers(name = null) {
    try {
      let objSearch = {
        status: {
          $ne: "DELETED",
        },
      };

      if (name) {
        objSearch = {
          ...objSearch,
          name,
        };
      }
      const customers = await Customer.find({ objSearch });

      return customers;
    } catch (error) {
      console.log(error);
    }
  }
  async updateCustomer(id, data) {
    const { name, lastName, email, username, password } = data;
    const customerInDb = await Customer.findById(id);

    if (!customerInDb || customerInDb.status === "DELETED")
      return { code: 404, message: "Cliente no Encontrado" };

    const newCustomer = {};

    newCustomer.name = name;
    newCustomer.lastName = lastName;
    newCustomer.email = email;
    newCustomer.username = username;
    newCustomer.password = await bcryptjs.hash(password, 10);

    const customer = await Customer.findByIdAndUpdate(
      { _id: id },
      newCustomer,
      {
        new: true,
      }
    );

    return customer;
  }
}

module.exports = CustomerRepository;
