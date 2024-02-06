const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const ProductController = require("../Controllers/ProductController");
const router = express.Router();

router.get("/get-data", ProductController.getProductAll);
router.get("/cart/data", ProductController.getCartProducts);
router.get("/get-product/:id", ProductController.getProduct);
router.get("/cart/get-product", ProductController.getCartProducts);
router.post("/add-to-cart/:id", ProductController.AddToCart);
router.put("/add-to-wishlist/:id", ProductController.AddToWishlist);
router.put("/remove-from-wishlist/:id", ProductController.removeFromWishlist);
router.post("/checkout", ProductController.checkout);
router.post("/apply-coupon", ProductController.verifyCoupon);
router.delete("/remove-from-cart/:id", ProductController.removeFromCart);

module.exports = router;
