const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ msg: "Sin Autorización" });

  try {
    const cifrado = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.customer = cifrado.customer;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token inválido" });
  }
};
