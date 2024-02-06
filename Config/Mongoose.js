const { connect, connection } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

connect(process.env.DB_URL);
connection.on("error", () => {
  console.log("MongoDb Connection Error");
});
module.exports = { connection };
