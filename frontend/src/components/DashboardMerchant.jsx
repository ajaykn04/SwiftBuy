import React from "react";
import Navbar from "./Navbar";

const DashboardMerchant = () => {
  const api_url=import.meta.env.VITE_API_URL;
  const data = JSON.parse(localStorage.getItem("userData"));
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
