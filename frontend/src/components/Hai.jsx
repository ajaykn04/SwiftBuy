import React, { useContext } from 'react'
import NavbarAdmin from './NavbarAdmin';
import NavbarMerchant from './NavbarMerchant';
import NavbarDeliveryagent from './NavbarDeliveryagent';
import Navbar from './Navbar';
import { AppContext } from '../AppContext';

const Hai = () => {
    const data = useContext(AppContext);
  return (
    <div>
      {data.role === "admin" ? (
        <NavbarAdmin />
      ) : data.role === "merchant" ? (
        <NavbarMerchant />
      ) : data.role === "deliveryagent" ? (
        <NavbarDeliveryagent />
      ) : (
        <Navbar />
      )}
    </div>
  )
}

export default Hai
