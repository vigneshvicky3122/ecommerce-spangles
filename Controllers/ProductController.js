const ProductModal = require("../Models/ProductSchema");
const cartModal = require("../Models/CartSchema");
const OrderModal = require("../Models/OrderSchema");
const CouponModal = require("../Models/couponSchema");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

const ProductController = {
  getProductAll: async (req, res) => {
    try {
      const productData = await ProductModal.find();

      return res.json({
        status: 200,
        message: "ProductData Fetched Successfully",
        productData,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  getCartProducts: async (req, res) => {
    try {
      const cartData = await cartModal.find();

      return res.json({
        status: 200,
        message: "ProductData Fetched Successfully",
        cartData,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  getProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const productData = await ProductModal.findById({ _id: id });

      return res.json({
        status: 200,
        message: "ProductData Fetched Successfully",
        productData,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  AddToCart: async (req, res) => {
    try {
      await cartModal.create(req.body);
      return res.json({
        status: 200,
        message: "Product Added to Cart",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  removeFromCart: async (req, res) => {
    const { id } = req.params;
    try {
      await cartModal.findOneAndDelete({ _id: id });
      return res.json({
        status: 200,
        message: "Product Removed from Cart",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  AddToWishlist: async (req, res) => {
    const { id } = req.params;
    try {
      await ProductModal.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            wishlist: true,
          },
        }
      );
      return res.json({
        status: 200,
        message: "Product Added to wishlist",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  removeFromWishlist: async (req, res) => {
    const { id } = req.params;
    try {
      await ProductModal.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            wishlist: false,
          },
        }
      );
      return res.json({
        status: 200,
        message: "Product Removed from wishlist",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  checkout: async (req, res) => {
    const { products, subtotal, shippingDetails, discounts } = req.body;
    try {
      await OrderModal.create({
        products,
        subtotal,
        discounts,
        shippingDetails: {
          state: shippingDetails.location,
        },
        shippingCharge: shippingDetails.chargeAmount,
      });
      return res.json({
        status: 200,
        message: "checkout successful",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  verifyCoupon: async (req, res) => {
    const { Coupon } = req.body;
    try {
      const verifyCoupon = await CouponModal.find({ couponCode: Coupon });

      if (verifyCoupon) {
        return res.json({
          status: 200,
          message: "Coupon Applied Successfully",
          discount_price: verifyCoupon[0].discount_price,
        });
      } else {
        return res.json({
          status: 400,
          message: "Invalid Coupon",
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
};
module.exports = ProductController;
