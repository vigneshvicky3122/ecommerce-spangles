const { Schema, model } = require("mongoose");
const OrderSchema = new Schema({
  products: Array,
  discounts: String,
  subtotal: Number,
  shippingCharge: Number,
  shippingDetails: Object,
  paymentDetails: Object,
});
let OrderModal = model(process.env.DB_COLLECTION_THREE, OrderSchema);
module.exports = OrderModal;
