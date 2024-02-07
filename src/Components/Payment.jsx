import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import RazorpayIcon from "../assets/Razorpay_payments.png";
function Payment() {
  const params = useParams();
  const navigate = useNavigate();
  const [CartData, setCartData] = useState([]);
  const [MRP, setMRP] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [CouponDiscount, setCouponDiscount] = useState(0);
  const [ShippingCharge, setShippingCharge] = useState({
    CurrentCharges: 0,
    discountCharges: 40,
  });
  const [ShippingDetails, setShippingDetails] = useState({});
  const [SubTotal, setSubTotal] = useState(0);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const response = await axios.get(`${URL}/product/order/${params.id}`);
      if (response.data.status === 200) {
        setCartData(response.data.orderData.products);
        setCouponDiscount(response.data.orderData.coupon.discount_price);
        setShippingDetails(response.data.orderData.shippingDetails);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setSubTotal(MRP - Discount - ShippingCharge.CurrentCharges);
  }, [MRP, Discount, ShippingCharge]);
  useEffect(() => {
    if (CartData && CartData.length > 0) {
      if (CartData.length === 1) {
        setMRP(CartData[0].price.MRP * parseInt(CartData[0].CartData.Qty));
        setDiscount(
          ((CartData[0].price.MRP * CartData[0].price.discount_percentage) /
            100) *
            parseInt(CartData[0].CartData.Qty) +
            CouponDiscount
        );
      } else if (CartData.length > 1) {
        setMRP(
          CartData.reduce((a, { price, CartData }) => {
            return a + price.MRP * parseInt(CartData.Qty);
          }, 0)
        );
        setDiscount(
          CartData &&
            CartData.reduce(
              (a, { price, CartData }) =>
                a +
                (price.MRP *
                  parseInt(CartData.Qty) *
                  price.discount_percentage) /
                  100,
              0
            ) + CouponDiscount
        );
      }
    }
  }, [CartData]);

  const initPayment = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.data.amount,
      currency: data.data.currency,
      name: "E-Commerce",
      description: "Test Transaction",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5DW7GDnJACNOi5TC7KzxsqWk-U4-xTdkaA&usqp=CAU",
      order_id: data.data.id,
      handler: async (response) => {
        try {
          let request = await axios.post(
            `${URL}/product/order/${params.id}/payment`,
            {
              response,
            }
          );
          if (request.status === 200) {
            navigate("/cart");
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handlePayment = async () => {
    try {
      let request = await axios.post(
        `${URL}/product/order/${params.id}/init-payment`,
        {
          amount: (100 * SubTotal).toString(),
        }
      );
      initPayment(request.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="container mx-auto w-full h-24 flex flex-col items-center justify-center bg-slate-50 my-10">
        <ol className="flex items-center ms-96 justify-center w-full">
          <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
            <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
              <svg
                className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
          </li>
          <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
          </li>
          <li className="flex items-center w-full">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </span>
          </li>
        </ol>
      </div>
      <div className="w-full m-5 flex flex-row items-start justify-around">
        <div className="w-[50%] flex flex-col items-center p-8 bg-slate-50">
          <h1 className="text-lg font-bold">CHOOSE PAYMENT METHOD</h1>
          <div className="inline-flex gap-5 items-center">
            <input
              type="radio"
              name="razorpay"
              id="razorpay"
              checked={true}
              disabled={true}
            />
            <img
              src={RazorpayIcon}
              alt=""
              className="w-20 h-20 mt-2 object-cover"
            />
            <span className="text-base font-bold">Pay With Razorpay</span>
          </div>
        </div>
        <div className="w-[35%] flex flex-col space-y-5">
          <div className="w-full flex flex-col space-y-1 bg-slate-50 p-5">
            <div className="inline-flex items-center">
              <svg
                className="w-4 h-4 me-2 text-green-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 0 0-2 2v9c0 .6.4 1 1 1h.5v.5a3.5 3.5 0 1 0 7-.5h3v.5a3.5 3.5 0 1 0 7-.5h.5c.6 0 1-.4 1-1v-4l-.1-.4-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.2 11.6.3.9a1.5 1.5 0 1 1-.3-1Zm-10 0 .3.9a1.5 1.5 0 1 1-.3-1ZM14 10V8h4.4l1 2H14Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="">
                Deliver To:{" "}
                <span className="font-semibold">
                  {ShippingDetails &&
                    ShippingDetails.first_name +
                      " " +
                      ShippingDetails.last_name}
                </span>
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              {`${ShippingDetails.address} ${ShippingDetails["town/village"]} ${ShippingDetails["city/district"]} ${ShippingDetails.state} ${ShippingDetails.pincode}`}
            </p>
            <p className="text-gray-600 text-sm">
              Contact Number:{" "}
              <span className="text-sm font-semibold">
                {ShippingDetails.phone}
              </span>
            </p>
          </div>
          <div className="w-full flex flex-col space-y-3 bg-slate-50 p-5">
            <h2 className="font-bold">PRICE DETAILS (3 items)</h2>
            <hr />
            <div className="inline-flex justify-between items-center">
              <p className="font-semibold">Total MRP (Inc. of Taxes)</p>
              <p className="font-semibold">&#8377;{MRP.toFixed(2)}</p>
            </div>
            <div className="inline-flex justify-between items-center">
              <p className="font-semibold">Beyoung Discount</p>
              <p className="font-semibold">&#8377;{Discount.toFixed(2)}</p>
            </div>
            <div className="inline-flex justify-between items-center">
              <p className="font-semibold">Shipping</p>
              <p className="font-semibold">
                {ShippingCharge.CurrentCharges === 0 ? (
                  <>
                    <strike>
                      &#8377;{ShippingCharge.discountCharges.toFixed(2)}
                    </strike>
                    <span className="text-green-400"> free</span>
                  </>
                ) : (
                  <span className="text-gray-800">
                    &#8377;{ShippingCharge.CurrentCharges}
                  </span>
                )}
              </p>
            </div>
            <div className="inline-flex justify-between items-center">
              <p className="font-semibold">Cart Total</p>
              <p className="font-semibold">&#8377;{SubTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="w-full flex-col flex space-y-3 bg-slate-50 p-5">
            <div className="inline-flex items-center justify-between">
              <h6 className="font-bold text-lg">Total Amount</h6>
              <h6 className="font-bold text-lg">
                &#8377;{SubTotal.toFixed(2)}
              </h6>
            </div>
            <div className="bg-green-500">
              <p className="text-white text-center p-1">
                You Saved &#8377;
                {(Discount + ShippingCharge.CurrentCharges).toFixed(2)} on this
                order
              </p>
            </div>
            <button
              type="button"
              onClick={() => handlePayment()}
              className="text-white font-semibold bg-blue-400 hover:bg-opacity-50 hover:cursor-pointer p-3 text-center"
            >
              CHECKOUT SECURELY
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Payment;
