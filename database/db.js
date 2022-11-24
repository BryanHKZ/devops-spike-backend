const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abraham:spike@cluster0.7923d.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DataBase shop On");
  } catch (error) {
    console.log("mongo shop connection unsuccessful, retry after 5 seconds");
    setTimeout(conectarDB, 5000);
  }
};

module.exports = conectarDB;
