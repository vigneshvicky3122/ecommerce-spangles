import React from "react";
import { Outlet } from "react-router-dom";

function Order() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}

export default Order;
