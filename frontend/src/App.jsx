import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardUser from "./components/DashboardUser";
import DashboardMerchant from "./components/DashboardMerchant";
import DashboardDeliveryagent from "./components/DashboardDeliveryagent";
import colors from "./colors";
import { AppContext } from "./AppContext";
import { useState } from "react";
import Profile from "./components/Profile";
import ProductAdd from "./components/ProductAdd";
import MyProduct from "./components/MyProduct";
import SearchProduct from "./components/SearchProduct";
import Users from "./components/Users";
import Products from "./components/Products";

function App() {
  const [data, setData] = useState({
    username: "",
    place: "",
    age: "",
    email: "",
    password: "",
    role: "",
  });
  document.body.style.backgroundColor = colors.backgroundcolor;

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ data, setData }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/admindash" element={<DashboardAdmin />} />
            <Route path="/userdash" element={<DashboardUser />} />
            <Route path="/merchantdash" element={<DashboardMerchant />} />
            <Route
              path="/deliveryagentdash"
              element={<DashboardDeliveryagent />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/add" element={<ProductAdd />} />
            <Route path="/merchant/products" element={<MyProduct />} />
            <Route path="/search/products" element={<SearchProduct />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/products" element={<Products />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
