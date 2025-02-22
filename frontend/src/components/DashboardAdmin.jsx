import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const DashboardAdmin = () => {
  const api_key=import.meta.env.VITE_API_KEY;
  
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
