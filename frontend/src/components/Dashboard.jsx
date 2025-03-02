import React from 'react'
import DashboardAdmin from './DashboardAdmin';
import DashboardMerchant from './DashboardMerchant';
import DashboardDeliveryagent from './DashboardDeliveryagent';
import DashboardUser from './DashboardUser';

const Dashboard = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
  return (
    <div>
      {data.role === "admin" ? (
        <DashboardAdmin/>
      ) : data.role === "merchant" ? (
        <DashboardMerchant />
      ) : data.role === "deliveryagent" ? (
        <DashboardDeliveryagent />
      ) : (
        <DashboardUser />
      )}
    </div>
  )
}

export default Dashboard
