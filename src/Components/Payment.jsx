import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../App";
import { useParams } from "react-router-dom";
import RazorpayIcon from "../assets/Razorpay_payments.png";
function Payment() {
  const params = useParams();
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
          let request = await axios.post(`${URL}/verify/${params.id}`, {
            response,
          });
          if (request.data.status === 200) {
            handleRemove(params.id);
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
  const handlePayment = async (amount) => {
    try {
      let request = await axios.post(`${URL}/order/payment`, {
        amount: (100 * amount).toString(),
      });
      initPayment(request.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                class="w-4 h-4 me-2 text-green-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 0 0-2 2v9c0 .6.4 1 1 1h.5v.5a3.5 3.5 0 1 0 7-.5h3v.5a3.5 3.5 0 1 0 7-.5h.5c.6 0 1-.4 1-1v-4l-.1-.4-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.2 11.6.3.9a1.5 1.5 0 1 1-.3-1Zm-10 0 .3.9a1.5 1.5 0 1 1-.3-1ZM14 10V8h4.4l1 2H14Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="">
                Deliver To: <span className="font-semibold">{"sdkwrm"}</span>
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              {
                "Minim id laboris ipsum aliqua esse non et. Commodo ipsum anim qui consequat ex. Aliquip do ut enim minim non minim Lorem est excepteur amet et ad. Officia ad sint cillum Lorem. Id nisi amet aute laborum Lorem minim pariatur ex ut officia. Cillum cillum ea magna est ex consequat esse ex anim culpa minim proident eiusmod commodo. Cupidatat dolore exercitation proident duis labore."
              }
            </p>
            <p className="text-gray-600 text-sm">
              Contact Number:{" "}
              <span className="text-sm font-semibold">{"8304873122"}</span>
            </p>
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
              onClick={() => handlePayment(product.total)}
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
