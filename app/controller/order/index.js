const OrderRepository = require("../../../database/repository/OrderRepository");

const orderServices = new OrderRepository();
const createOrder = async (req, res) => {
  try {
    const order = await orderServices.newOrder(req.body);
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Ha ocurrido un error con el servidor :(" });
  }
};

const getOrders = async (req, res) => {
  try {
    let query = req.query.customer;
    const orders = await orderServices.getOrder(query);
    if (orders.length === 0)
      return res
        .status(404)
        .json({ message: "No se encontraron pedidos para este usuario" });
    return res.status(201).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Ha ocurrido un error con el servidor :(" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderServices.findOrderById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "No se encontró el pedido" });

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Ha ocurrido un error con el servidor :(" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
