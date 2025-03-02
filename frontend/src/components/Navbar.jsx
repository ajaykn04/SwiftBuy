import React from 'react'
import NavbarAdmin from './NavbarAdmin';
import NavbarMerchant from './NavbarMerchant';
import NavbarDeliveryagent from './NavbarDeliveryagent';
import NavbarUser from './NavbarUser';

const Navbar = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
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
  )
}

export default Navbar
