const customerRoutes = require("./customer");
const productRoutes = require("./product");
const orderRoutes = require("./orders");
const authRoutes = require("./auth");

const registerRoutes = (app) => {
  app.use("/api", customerRoutes);
  app.use("/api", productRoutes);
  app.use("/api", orderRoutes);
  app.use("/api", authRoutes);
};

module.exports = registerRoutes;
