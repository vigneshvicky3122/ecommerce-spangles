const { Schema, model } = require("mongoose");
const OrderSchema = new Schema({
  products: Array,
  coupon: Object,
  discounts: Number,
  subtotal: Number,
  shippingCharge: Object,
  shippingDetails: Object,
  paymentDetails: Object,
});
let OrderModal = model(process.env.DB_COLLECTION_THREE, OrderSchema);
module.exports = OrderModal;
