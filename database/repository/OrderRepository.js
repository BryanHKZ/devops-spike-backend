const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");
const CustomerRepository = require("./CustomerRepository");

const customerService = new CustomerRepository();

const mapData = async (data) => {
  if (!data) return null;
  let obj = {
    orderNumber: data.id,
    addressCustomer: data.addressCustomer,
    phoneCustomer: data.phoneCustomer,
    customer: await customerService.getCustomer(data.idCustomer),
    products: data.products,
  };

  return obj;
};

class OrderRepository {
  async newOrder(data) {
    const order = new Order(data);
    const res = await order.save();
    return res;
  }

  async getOrder(idCustomer = null) {
    // const params = [
    //   {
    //     $lookup: {
    //       from: "customers",
    //       localField: "idCustomer",
    //       foreignField: "_id",
    //       as: "idCustomer",
    //     },
    //   },
    // ];

    let searchParams = { idCustomer };

    if (!idCustomer) {
      searchParams = {};
    }

    try {
      const res = await Order.find(searchParams);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async findOrderById(id) {
    const order = await Order.findById(id);
    return await mapData(order);
  }
}

module.exports = OrderRepository;
