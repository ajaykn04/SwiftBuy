import React, { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";

const DashboardAdmin = () => {
  const api_key=import.meta.env.VITE_API_KEY;
  
  return (
    <div>
      <NavbarAdmin />
      <br />
      <br />
      <br />
      <br />
      THIS IS ADMIN DASHBOARD
    </div>
  );
};

export default DashboardAdmin;
