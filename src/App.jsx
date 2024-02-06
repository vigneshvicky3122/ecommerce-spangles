import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
export const URL = import.meta.env.VITE_BACKEND_API;
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import Address from "./Components/Address";
import Payment from "./Components/Payment";
import Order from "./Components/Order";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/product" />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="order/:id" element={<Order />}>
            <Route path="address" element={<Address />} />
            <Route path="payment" element={<Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
