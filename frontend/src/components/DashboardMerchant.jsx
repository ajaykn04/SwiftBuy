import React from "react";
import NavbarMerchant from "./NavbarMerchant";
const DashboardMerchant = () => {
  const api_key=import.meta.env.VITE_API_KEY;
  return (
    <div>
      <NavbarMerchant />
      <br />
      <br />
      <br />
      <br />
      THIS IS MERCHANT DASHBOARD
    </div>
  );
};

export default DashboardMerchant;
