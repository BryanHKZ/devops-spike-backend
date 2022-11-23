const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const registerRoutes = require("./routes/main");
const dotEnv = require("dotenv");
const conectarDB = require("./database/db");

const app = express();
const server = require("http").Server(app);

app.use(cors());
app.use(express.json({ extends: true }));
dotEnv.config();
conectarDB();
registerRoutes(app);

var PORT = process.env.PORT || 4000;

server.listen(PORT, function () {
  console.log(`api rest run on port ${PORT}`);
});
