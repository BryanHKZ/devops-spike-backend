const Product = require("../models/Product");

class ProductRepository {
  async newProduct(data) {
    const product = new Product(data);
    const res = await product.save();
    return res;
  }
  async removeProduct(id) {
    const product = await Product.findById(id);

    if (product.status === "DELETED") return null;

    if (product) {
      product.status = "DELETED";
      product.save();
    }
  }
  async getProduct(id) {
    const product = await Product.findById(id);

    return product;
  }
  async getAllProducts(name = null) {
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
    const products = await Product.find(objSearch);

    return products;
  }
  async updateProduct(id, data) {
    try {
      const { name, price, code } = data;
      const producto = await Product.findById(id);

      if (!producto || producto.status === "DELETED")
        return { code: 404, message: "Producto no Encontrado" };

      const nuevoProducto = {};

      nuevoProducto.name = name;
      nuevoProducto.price = price;
      nuevoProducto.code = code;

      const product = await Product.findByIdAndUpdate(
        { _id: id },
        nuevoProducto,
        {
          new: true,
        }
      );

      return product;
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Ha ocurrido un error" });
    }
  }
}

module.exports = ProductRepository;
