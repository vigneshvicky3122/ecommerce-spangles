const { Schema, model } = require("mongoose");
const ProductSchema = new Schema({
  name: String,
  price: Object,
  images: Array,
  size: Array,
  category: String,
  ratings: Object,
  colors: Array,
  wishlist: Boolean,
});
let ProductModal = model(process.env.DB_COLLECTION_ONE, ProductSchema);
module.exports = ProductModal;
