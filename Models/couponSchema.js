const { Schema, model } = require("mongoose");
const CouponSchema = new Schema({
  couponCode: String,
  discount_price: Number,
});
let CouponModal = model(process.env.DB_COLLECTION_FOUR, CouponSchema);
module.exports = CouponModal;
