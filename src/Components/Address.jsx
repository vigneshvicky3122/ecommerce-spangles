import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../App";
import { useParams } from "react-router-dom";

function Address() {
  const params = useParams();
  const [AddressData, setAddressData] = useState({});
  const [CartData, setCartData] = useState([]);
  useEffect(() => {
    // getData();
  }, []);
  async function getData() {
    try {
      const response = await axios.get(`${URL}/product/order/${params.id}`);
      if (response.data.status === 200) {
        setCartData(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleChange(event) {
    setAddressData({
      ...AddressData,
      [event.target.name]: event.target.name.value,
    });
  }
  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/product/order/${params.id}/address`,
        AddressData
      );
      if (response.data.status === 201) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <div className="container mx-auto w-full h-24 flex flex-col items-center justify-center bg-slate-50 my-10">
      <ol class="flex items-center ms-96 justify-center w-full">
          <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
            <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
              <svg
                class="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
          </li>
          <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
            <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
            </span>
          </li>
          <li class="flex items-center w-full">
            <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
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
        <form onSubmit={handleSubmit} className="w-[50%]">
          <div className="flex flex-col space-y-3 items-center justify-center">
            <div className="inline-flex gap-2 items-center">
              <p>Already have an account? </p>
              <a
                href="/"
                className="border-2 border-blue-400 text-blue-400 p-2"
              >
                Login/Signup
              </a>
            </div>
            <span className="font-bold">OR</span>
            <p className="font-semibold">Checkout as Guest</p>
          </div>
          <div class="w-full grid gap-6 my-6 md:grid-cols-2">
            <div>
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="first_name"
                name="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                for="last_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="last_name"
                name="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type="tel"
                id="phone"
                name="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="pinCode"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pincode <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="pincode"
                name="pincode"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="town/village"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Town/Village <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="town/village"
                name="town/village"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="city/district"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City/District <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="city/district"
                name="city/district"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="state"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                State <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="state"
                name="state"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>
          <div>
            <label
              for="address"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address (House No, Building, Street, Area){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="address"
              id="address"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <button type="submit" className="hidden" id="SubmitBtn"></button>
        </form>
        <div className="w-[35%] flex flex-col space-y-5">
          <div className="w-full flex flex-col space-y-3 bg-slate-50 p-5">
            <h3 className="font-bold inline-flex gap-2">
              <svg
                class="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 7h-.7a3.4 3.4 0 0 0-.7-4c-.6-.6-1.5-1-2.4-1-1.8 0-3.3 1.2-4.4 2.5C10.4 2.8 9 2 7.5 2a3.5 3.5 0 0 0-3.1 5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2ZM10 7H7.6a1.5 1.5 0 0 1 0-3c.9 0 2 .8 3 2.1l-.4.9Zm6.2 0h-3.8c1-1.4 2.4-3 3.8-3a1.5 1.5 0 0 1 0 3ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z" />
              </svg>
              Offer & Benefits
            </h3>
            <div className="w-full inline-flex justify-between items-center bg-white rounded">
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter code"
                className="p-2 border-0 bg-white rounded-s"
              />
              <button className="bg-blue-500 rounded-e text-white p-2">
                APPLY
              </button>
            </div>
            <hr />
            <div className="inline-flex justify-between items-center">
              <p className="">
                Fat &#8377;100 off on orders above &#8377;999 -
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
              <p className="font-semibold">&#8377;{}</p>
            </div>
            <div className="inline-flex justify-between items-center">
              <p className="font-semibold">Beyoung Discount</p>
              <p className="font-semibold">&#8377;{}</p>
            </div>
            <div className="inline-flex justify-between items-center">
              <p className="font-semibold">Shipping</p>
              <p className="font-semibold">
                <strike>&#8377;{}</strike>
                <span className="text-green-400">Free</span>
              </p>
            </div>
            <div className="inline-flex justify-between items-center">
              <p className="font-semibold">Cart Total</p>
              <p className="font-semibold">&#8377;{}</p>
            </div>
          </div>
          <div className="w-full flex-col flex space-y-3 bg-slate-50 p-5">
            <div className="inline-flex items-center justify-between">
              <h6>Total Amount</h6>
              <h6>&#8377;{}</h6>
            </div>
            <div className="bg-green-500">
              <p className="text-white text-center p-1">
                You Saved &#8377;{} on this order
              </p>
            </div>
            <button
              type="button"
              onClick={() => document.getElementById("SubmitBtn").click()}
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

export default Address;
