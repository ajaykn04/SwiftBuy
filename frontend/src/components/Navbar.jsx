import React, { useContext } from 'react'
import NavbarAdmin from './NavbarAdmin';
import NavbarMerchant from './NavbarMerchant';
import NavbarDeliveryagent from './NavbarDeliveryagent';
import NavbarUser from './NavbarUser';
import { AppContext } from '../AppContext';

const Navbar = () => {
    const data = useContext(AppContext);
    console.log(data.data.role)
  return (
    <div>
      {data.data.role === "admin" ? (
        <NavbarAdmin />
      ) : data.data.role === "merchant" ? (
        <NavbarMerchant />
      ) : data.data.role === "deliveryagent" ? (
        <NavbarDeliveryagent />
      ) : (
        <NavbarUser />
      )}
    </div>
  )
}

export default Navbar
