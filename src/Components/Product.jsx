import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { URL } from "../App";
import { useNavigate } from "react-router-dom";
function Product() {
  const navigate = useNavigate();
  const [ProductData, setProductData] = useState([]);
  const [CartData, setCartData] = useState({
    Color1: "Burgundy",
    Color2: "Black",
    Color3: "Blue",
    Color4: "Sage Green",
    Size1: "S",
    Size2: "XS",
    Size3: "L",
    Size4: "XL",
    Qty: "1",
  });
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const response = await axios.get(`${URL}/product/get-data`);
      if (response.data.status === 200) {
        setProductData(response.data.productData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = (e) => {
    setCartData({ ...CartData, [e.target.name]: e.target.value });
  };
  async function handleSubmit(id) {}

  async function addToCart(id) {
    const Data = {
      name: ProductData[0].name,
      image: ProductData[0].images[0],
      category: ProductData[0].category,
      price: ProductData[0].price,
      CartData: CartData,
    };
    try {
      const response = await axios.post(
        `${URL}/product/add-to-cart/${id}`,
        Data
      );
      if (response.data.status === 200) {
        navigate("/cart");
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function AddToWishlist(id) {
    const update = [...ProductData];
    update[0].wishlist = true;
    setProductData(update);
    try {
      const response = await axios.put(
        `${URL}/product/add-to-wishlist/${id}`,
        {}
      );
      if (response.data.status === 200) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function RemoveFromWishlist(id) {
    const update = [...ProductData];
    update[0].wishlist = false;
    setProductData(update);
    try {
      const response = await axios.put(
        `${URL}/product/remove-from-wishlist/${id}`,
        {}
      );
      if (response.data.status === 200) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <React.Fragment>
      <section className="w-screen h-auto flex flex-col justify-center items-center">
        {ProductData &&
          ProductData.map((product, index) => (
            <div
              key={index}
              className="container flex flex-row justify-around items-start gap-10"
            >
              <div className="w-[50%] flex flex-row items-start gap-5">
                <div className="w-1/4 flex flex-col items-center gap-5 h-screen overflow-y-scroll">
                  {product.images.map((image, idx) => (
                    <img key={idx} src={image} alt="" />
                  ))}
                </div>
                <div className="w-full h-screen">
                  <Carousel indicators={false} slide={false}>
                    {product.images.map((image, idx) => (
                      <img key={idx} src={image} alt="" className="" />
                    ))}
                  </Carousel>
                </div>
              </div>
              <div className="w-[50%] flex flex-col space-y-4">
                <div className="w-full flex flex-row justify-between items-start my-5">
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg">{product.name}</h1>
                    <p className="text-gray-600 font-semibold">
                      {product.category}
                    </p>
                  </div>
                  {!product.wishlist ? (
                    <button
                      onClick={() => AddToWishlist(product._id)}
                      className="bg-slate-100 p-1 rounded-full hover:cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => RemoveFromWishlist(product._id)}
                      className="bg-slate-100 p-1 rounded-full hover:cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5 text-red-600 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="inline-flex items-center gap-2">
                    <h6 className="font-bold text-base">
                      &#8377;{" "}
                      {(
                        ((product.price.MRP *
                          product.price.discount_percentage) /
                          100) *
                        parseInt(CartData.Qty)
                      ).toFixed(2)}
                    </h6>
                    <strike className="text-gray-500">
                      &#8377;{" "}
                      {(product.price.MRP * parseInt(CartData.Qty)).toFixed(2)}
                    </strike>
                    <p className="font-semibold text-green-500">
                      ({product.price.discount_percentage}% off)
                    </p>
                  </div>
                  <p className="text-gray-600 font-semibold">
                    Inclusive of All Taxes + Free Shipping
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-3">
                    <div className="inline-flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-400 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-400 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-400 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-400 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-400 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>
                    </div>
                    <p className="font-semibold">
                      {product.ratings.rating.toFixed(1)}
                      <span className="text-gray-500">
                        ({product.ratings.count} Ratings & Reviews)
                      </span>
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-red-600 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 3h-5.7a2 2 0 0 0-1.4.6L3.6 11a2 2 0 0 0 0 2.8l6.6 6.6a2 2 0 0 0 2.8 0l7.4-7.5a2 2 0 0 0 .6-1.4V6a3 3 0 0 0-3-3Zm-2.4 6.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="font-bold">
                      Extra &#8377;100 OFF on &#8377;999 (Code:BEYOUNG100)
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-5">
                  <div className="flex flex-col space-y-2 w-[35%]">
                    {[1, 2, 3, 4].map((c, i) => (
                      <div key={i}>
                        <label
                          htmlFor={`Color${i + 1}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Color {i + 1}
                          <span className="text-red-600">*</span>
                        </label>
                        <select
                          id={`Color${i + 1}`}
                          name={`Color${i + 1}`}
                          defaultValue={CartData[`Color${i + 1}`]}
                          onChange={handleChange}
                          className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>Choose a Color</option>
                          {product.colors.map((color, id) => (
                            <option key={id} value={color}>
                              {color}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-2 w-[35%]">
                    {[1, 2, 3, 4].map((s, i) => (
                      <div key={i}>
                        <label
                          htmlFor={`Size${i + 1}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Size {i + 1}
                          <span className="text-red-600">*</span>
                        </label>
                        <select
                          id={`Size${i + 1}`}
                          name={`Size${i + 1}`}
                          defaultValue={CartData[`Size${i + 1}`]}
                          onChange={handleChange}
                          className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>Choose a Size</option>
                          {product.size.map((size, id) => (
                            <option key={id} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="flex flex-col w-[25%]">
                    <label
                      htmlFor="Qty"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      QTY:
                    </label>
                    <select
                      id="Qty"
                      name="Qty"
                      onChange={handleChange}
                      defaultValue={CartData[`Qty`]}
                      required
                      className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>Choose a QTY</option>
                      {[1, 2, 3, 4, 5].map((qty, id) => (
                        <option key={id} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <a href="#!" className="text-blue-500 text-sm font-semibold">
                    SIZE CHART
                  </a>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                  <select
                    id="offer"
                    name="offer"
                    defaultValue={""}
                    className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>OFFERS FOR YOU</option>
                  </select>
                </div>
                <div className="inline-flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => addToCart(product._id)}
                    className="text-white w-2/4 bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
                  >
                    <svg
                      className="w-4 h-4 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4c0-.6.4-1 1-1h1.5c.5 0 .9.3 1 .8L7.9 6H19a1 1 0 0 1 1 1.2l-1.3 6a1 1 0 0 1-1 .8h-8l.2 1H17a3 3 0 1 1-2.8 2h-2.4a3 3 0 1 1-4-1.8L5.7 5H5a1 1 0 0 1-1-1Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    ADD TO CART
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit(product._id)}
                    className="text-gray-800 w-2/4 bg-yellow-300 hover:bg-yellow-200 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center me-2 mb-2"
                  >
                    <svg
                      className="w-4 h-4 me-1 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
      </section>
    </React.Fragment>
  );
}

export default Product;
