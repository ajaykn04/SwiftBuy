import React from "react";
import Navbar from "./Navbar";
const DashboardMerchant = () => {
  const api_key=import.meta.env.VITE_API_KEY;
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      THIS IS MERCHANT DASHBOARD
    </div>
  );
};

export default DashboardMerchant;
