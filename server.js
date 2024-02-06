const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const PORT = process.env.PORT || 8000;
const server = express();
const { connection } = require("./Config/Mongoose");
const router = require("./routes/ProductRouter");
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
server.use(bodyParser.json());

server.use("/api/product", router);

server.listen(PORT, () => {
  console.log(`Server is running into PORT : ${PORT}`);
  connection.once("open", () => {
    console.log("MongoDb Connected");
  });
});
