import React from "react";
import Navbar from "./Navbar";

const DashboardAdmin = () => {
  const api_url=import.meta.env.VITE_API_URL;
  
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      THIS IS ADMIN DASHBOARD
    </div>
  );
};

export default DashboardAdmin;
