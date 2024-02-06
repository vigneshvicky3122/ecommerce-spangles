const { Schema, model } = require("mongoose");
const cartSchema = new Schema({
  name: String,
  price: Object,
  image: String,
  category: String,
  CartData: Object,
});
let cartModal = model(process.env.DB_COLLECTION_TWO, cartSchema);
module.exports = cartModal;
