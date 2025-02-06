import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Rating,
    Typography,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import NavbarAdmin from "./NavbarAdmin";
  import { useNavigate } from "react-router-dom";
  import "react-responsive-carousel/lib/styles/carousel.min.css";
  import { Carousel } from "react-responsive-carousel";
  import axios from "axios";
  
  const DashboardAdmin = () => {
    
  
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
  