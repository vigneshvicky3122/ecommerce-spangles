import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../App";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [CartData, setCartData] = useState([]);
  const [MRP, setMRP] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [CouponDiscount, setCouponDiscount] = useState(0);
  const [Coupon, setCoupon] = useState("");
  const [CouponApplied, setCouponApplied] = useState({
    status: false,
    message: "",
  });
  const [ShippingCharge, setShippingCharge] = useState({
    CurrentCharges: 0,
    discountCharges: 40,
  });
  const [SubTotal, setSubTotal] = useState(0);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setSubTotal(MRP - Discount - ShippingCharge.CurrentCharges);
  }, [MRP, Discount, ShippingCharge]);

  async function getData() {
    try {
      const response = await axios.get(`${URL}/product/cart/data`);
      if (response.data.status === 200) {
        setCartData(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
  }, [CartData, CouponApplied]);

  async function handleCoupon() {
    try {
      const response = await axios.post(`${URL}/product/apply-coupon`, {
        Coupon: Coupon,
      });
      if (response.data.status === 200) {
        setCouponDiscount(response.data.discount_price);
        setCouponApplied((prev) => {
          return { ...prev, status: true, message: response.data.message };
        });
      }
      if (response.data.status === 400) {
        setCouponApplied((prev) => {
          return { ...prev, status: false, message: response.data.message };
        });
        setTimeout(() => {
          setCouponApplied((prev) => {
            return { ...prev, status: false, message: "" };
          });
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function RemoveFromCart(id, index) {
    const update = [...CartData];
    update.splice(index, 1);
    setCartData(update);
    try {
      const response = await axios.delete(
        `${URL}/product/remove-from-cart/${id}`
      );
      if (response.data.status === 200) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit() {
    const oderData = {
      products: CartData,
      coupon: {
        status: CouponApplied.status,
        couponCode: CouponApplied.status ? Coupon : "",
        discount_price: CouponDiscount,
      },
      shippingCharge: ShippingCharge,
    };
    try {
      const response = await axios.post(`${URL}/product/order/new`, oderData);
      if (response.data.status === 201) {
        navigate(`/order/${response.data.orderId}/address`);
      }
      if (response.data.status === 400) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <React.Fragment>
      {CartData && CartData.length > 0 ? (
        <div>
          <div className="container mx-auto w-full h-24 flex flex-col items-center justify-center bg-slate-50 my-10">
            <ol className="flex items-center ms-96 justify-center w-full">
              <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                  <svg
                    className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.3L19 7H7.3"
                    />
                  </svg>
                </span>
              </li>
              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <svg
                    className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
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
          <div className="w-full flex flex-row items-start justify-around">
            <div className="max-w-lg h-screen overflow-y-auto flex flex-col space-y-3">
              {CartData &&
                CartData.map((product, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-slate-50 border border-gray-200 rounded-lg shadow md:max-w-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="flex flex-col md:flex-row p-4">
                      <div className="flex flex-col space-y-2">
                        <img
                          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                          src={product.image}
                          alt=""
                        />
                        <select
                          id="Qty"
                          name="Qty"
                          onChange={(event) => {
                            const update = [...CartData];
                            update[index].CartData.Qty = event.target.value;
                            setCartData(update);
                          }}
                          defaultValue={product.CartData.Qty}
                          className="bg-white w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {[1, 2, 3, 4, 5].map((qty, id) => (
                            <option key={id} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col space-y-2 justify-between p-4 leading-normal">
                        <div className="flex flex-col">
                          <h1 className="font-bold text-base">
                            {product.name}
                          </h1>
                          <p className="text-gray-600 font-semibold">
                            {product.category}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <div className="inline-flex items-center gap-2">
                            <h6 className="font-bold text-base">
                              &#8377;{" "}
                              {(
                                ((product.price.MRP *
                                  product.price.discount_percentage) /
                                  100) *
                                parseInt(product.CartData.Qty)
                              ).toFixed(2)}
                            </h6>
                            <strike className="text-gray-500">
                              &#8377;{" "}
                              {(
                                product.price.MRP *
                                parseInt(product.CartData.Qty)
                              ).toFixed(2)}
                            </strike>
                            <p className="font-semibold text-green-500">
                              ({product.price.discount_percentage}% off)
                            </p>
                          </div>
                          <p className="text-gray-600 font-semibold">
                            You Save{" "}
                            <span className="text-green-500">
                              &#8377;
                              {(
                                ((product.price.MRP *
                                  product.price.discount_percentage) /
                                  100) *
                                parseInt(product.CartData.Qty)
                              ).toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-row gap-10">
                          <div className="flex flex-col space-y-2">
                            <p className="">
                              Color 1:{" "}
                              <span className="font-semibold">
                                {product.CartData.Color1}
                              </span>
                            </p>
                            <p className="">
                              Color 2:{" "}
                              <span className="font-semibold">
                                {product.CartData.Color2}
                              </span>
                            </p>
                            <p className="">
                              Color 3:{" "}
                              <span className="font-semibold">
                                {product.CartData.Color3}
                              </span>
                            </p>
                            <p className="">
                              Color 4:{" "}
                              <span className="font-semibold">
                                {product.CartData.Color4}
                              </span>
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <p className="">
                              Size 1:{" "}
                              <span className="font-semibold">
                                {product.CartData.Size1}
                              </span>
                            </p>
                            <p className="">
                              Size 2:{" "}
                              <span className="font-semibold">
                                {product.CartData.Size2}
                              </span>
                            </p>
                            <p className="">
                              Size 3:{" "}
                              <span className="font-semibold">
                                {product.CartData.Size3}
                              </span>
                            </p>
                            <p className="">
                              Size 4:{" "}
                              <span className="font-semibold">
                                {product.CartData.Size4}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full border inline-flex justify-between items-center p-3">
                      <button
                        type="button"
                        onClick={() => RemoveFromCart(product._id, index)}
                        className="font-semibold"
                      >
                        Remove
                      </button>
                      <a href="/wishlist" className="font-semibold">
                        Move To Wishlist
                      </a>
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-[35%] flex flex-col space-y-5">
              <div className="w-full flex flex-col space-y-3 bg-slate-50 p-5">
                <h3 className="font-bold inline-flex gap-2">
                  <svg
                    className="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 7h-.7a3.4 3.4 0 0 0-.7-4c-.6-.6-1.5-1-2.4-1-1.8 0-3.3 1.2-4.4 2.5C10.4 2.8 9 2 7.5 2a3.5 3.5 0 0 0-3.1 5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2ZM10 7H7.6a1.5 1.5 0 0 1 0-3c.9 0 2 .8 3 2.1l-.4.9Zm6.2 0h-3.8c1-1.4 2.4-3 3.8-3a1.5 1.5 0 0 1 0 3ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z" />
                  </svg>
                  Offer & Benefits
                </h3>
                {CouponApplied.status ? (
                  <p className="text-green-800 font-semibold text-sm">
                    Coupon Applied! You have Saved &#8377;
                    {CouponDiscount.toFixed(2)}
                    <span
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setCouponDiscount(0);
                        setCouponApplied({ status: false });
                      }}
                    >
                      <svg
                        className="w-6 h-6 text-red-600 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </span>
                  </p>
                ) : (
                  <>
                    <div className="w-full inline-flex justify-between items-center bg-white rounded">
                      <input
                        onChange={(e) => setCoupon(e.target.value)}
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter code"
                        className="p-2 border-none focus:ring-0 bg-white rounded-s outline-none"
                      />
                      <button
                        onClick={() => handleCoupon()}
                        className="bg-blue-500 rounded-e text-white p-2"
                      >
                        APPLY
                      </button>
                    </div>
                    {CouponApplied.message !== "" && (
                      <p className="text-red-800 font-semibold text-sm">
                        {CouponApplied.message}
                      </p>
                    )}
                  </>
                )}
                <hr />
                <div className="inline-flex justify-between items-center">
                  <p className="">
                    Flat &#8377;100 off on orders above &#8377;999 -
                  </p>
                  <p className="bg-rose-100 p-2">BEYOUNG100</p>
                </div>
                <hr />
                <a href="#!" className="font-semibold">
                  Show More {">"}
                </a>
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
                    {(Discount + ShippingCharge.CurrentCharges).toFixed(2)} on
                    this order
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="text-white font-semibold bg-blue-400 hover:bg-opacity-50 hover:cursor-pointer p-3 text-center"
                >
                  CHECKOUT SECURELY
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-50">
          <a
            href="/product"
            className="bg-yellow-400 rounded font-semibold text-gray-800 p-2.5 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300"
          >
            Continue Shopping
          </a>
        </div>
      )}
    </React.Fragment>
  );
}

export default Cart;
