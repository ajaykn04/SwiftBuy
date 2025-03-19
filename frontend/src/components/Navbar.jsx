import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarMerchant from "./NavbarMerchant";
import NavbarDeliveryagent from "./NavbarDeliveryagent";
import NavbarUser from "./NavbarUser";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const data = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      data.role
      // console.log(data.role)
    } catch (error) {
      setHasError(true);
    }
  }, [data]);

  if (hasError || !data?.role) {
    navigate("/maryathaku_login_chey");
    setTimeout(() => {
      navigate("/");
    }, 5000);
    return null;
  }

  return (
    <div>
      {data.role === "admin" ? (
        <NavbarAdmin />
      ) : data.role === "merchant" ? (
        <NavbarMerchant />
      ) : data.role === "deliveryagent" ? (
        <NavbarDeliveryagent />
      ) : (
        <NavbarUser />
      )}
    </div>
  );
};

export default Navbar;
