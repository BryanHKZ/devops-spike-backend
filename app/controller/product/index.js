const ProductRepository = require("../../../database/repository/ProductRepository");

const productServices = new ProductRepository();

module.exports = {
  createProduct: async (req, res) => {
    try {
      const product = await productServices.newProduct(req.body);
      return res.status(201).json(product);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error con el servidor :(" });
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await productServices.getProduct(req.params.id);

      if (!product)
        return res.status(404).json({
          message: "Producto no encontrado",
        });

      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error con el servidor :(" });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const filter = req.query.name;
      let list = await productServices.getAllProducts(filter);

      return res.status(200).json(list);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error con el servidor :(" });
    }
  },
  removeProduct: async (req, res) => {
    try {
      if (!req.params.id)
        return res
          .status(400)
          .json({ message: "Se requiere la ID del producto" });
      const data = await productServices.removeProduct(req.params.id);

      if (!data)
        return res.status(404).json({ message: "Producto no encontrado" });
      return res
        .status(201)
        .json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error con el servidor :(" });
    }
  },
  updateProduct: async (req, res) => {
    if (!req.params.id)
      return res.status(400).json({
        message: "La ID del producto es requerida.",
      });
    try {
      const productUpdated = await productServices.updateProduct(
        req.params.id,
        req.body
      );

      if (productUpdated.message && productUpdated.code === 404) {
        return res
          .status(productUpdated.code)
          .json({ message: productUpdated.message });
      }

      return res.status(200).json(productUpdated);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
