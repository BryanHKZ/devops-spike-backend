const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const authControler = require("../../app/controller/auth");

// Iniciar sesion
// api/auth

router.post("/login", authControler.authUser);
router.get("/auth", auth, authControler.usuarioAutenticado);

module.exports = router;
