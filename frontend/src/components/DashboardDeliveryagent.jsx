import React from "react";
import NavbarDeliveryagent from "./NavbarDeliveryagent";

const DashboardDeliveryagent = () => {
  const api_key=import.meta.env.VITE_API_KEY;
  return (
    <div>
      <NavbarDeliveryagent />
      <br />
      <br />
      <br />
      <br />
      THIS IS DELIVERYAGENT DASHBOARD
    </div>
  );
};

export default DashboardDeliveryagent;
