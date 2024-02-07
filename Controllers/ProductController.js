const ProductModal = require("../Models/ProductSchema");
const cartModal = require("../Models/CartSchema");
const OrderModal = require("../Models/OrderSchema");
const CouponModal = require("../Models/couponSchema");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

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
  getOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const orderData = await OrderModal.findById({ _id: id });

      return res.json({
        status: 200,
        message: "OrderData Fetched Successfully",
        orderData,
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
    const { products, coupon, shippingCharge } = req.body;
    try {
      const newOrder = await OrderModal.create({
        products,
        coupon,
        shippingCharge,
      });
      return res.json({
        status: 201,
        message: "checkout successful",
        orderId: newOrder._id,
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

      if (verifyCoupon.length > 0) {
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
  applyCouponFromOrder: async (req, res) => {
    const { id } = req.params;
    const { Coupon } = req.body;

    try {
      const verifyCoupon = await CouponModal.find({ couponCode: Coupon });

      if (verifyCoupon.length > 0) {
        await OrderModal.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              coupon: {
                status: true,
                discount_price: verifyCoupon[0].discount_price,
                couponCode: verifyCoupon[0].couponCode,
              },
            },
          }
        );
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
  addressFromOrder: async (req, res) => {
    const { id } = req.params;

    try {
      await OrderModal.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            shippingDetails: req.body,
          },
        }
      );
      return res.json({
        status: 200,
        message: "checkout succuss",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  deleteCouponFromOrder: async (req, res) => {
    const { id } = req.params;
    try {
      await OrderModal.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            coupon: {
              status: false,
              discount_price: 0,
              couponCode: "",
            },
          },
        }
      );
      return res.json({
        status: 200,
        message: "Coupon Removed!",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  initPayment: async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZOR_PAY_ID,
        key_secret: process.env.RAZOR_PAY_KEY,
      });

      const options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };

      instance.orders.create(options, (error, order) => {
        if (error) {
          console.log(error);
          return res.status(404).json({ message: "Something Went Wrong!" });
        }
        res.status(200).json({ data: order });
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
      console.log(error);
    }
  },
  Payment: async (req, res) => {
    try {
      const sign =
        req.body.response.razorpay_order_id +
        "|" +
        req.body.response.razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZOR_PAY_KEY)
        .update(sign.toString())
        .digest("hex");
      if (req.body.response.razorpay_signature === expectedSign) {
        await OrderModal.findByIdAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              paymentDetails: {
                paymentId: req.body.response.razorpay_payment_id,
                razorpayOrderId: req.body.response.razorpay_order_id,
                paymentStatus: "Success",
                paymentSignature: req.body.response.razorpay_signature,
              },
            },
          }
        );
        const OrderProducts = await OrderModal.findById({
          _id: req.params.id,
        });
        let removeFromCart;
        for (let index = 0; index < OrderProducts.products.length; index++) {
          const element = OrderProducts.products[index]._id;
          removeFromCart = await cartModal.findByIdAndDelete({ _id: element });
        }

        if (removeFromCart) {
          return res.status(200).json({ message: "Payment successful" });
        }
      } else {
        return res.status(404).json({ message: "Invalid signature sent!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
      console.log(error);
    }
  },
};
module.exports = ProductController;
