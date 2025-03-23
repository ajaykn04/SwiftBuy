import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import colors from "./colors";
import { AppContext } from "./AppContext";
import { useState } from "react";
import Profile from "./components/Profile";
import ProductAdd from "./components/ProductAdd";
import MyProduct from "./components/MyProduct";
import SearchProduct from "./components/SearchProduct";
import Users from "./components/Users";
import Products from "./components/Products";
import Dashboard from "./components/Dashboard";
import DetailedProduct from "./components/DetailedProduct";
import MyCart from "./components/MyCart";
import MyOrder from "./components/MyOrder";
import Wishlist from "./components/Wishlist";
import Test from "./components/Test";
import AdminTools from "./components/AdminTools";

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/add" element={<ProductAdd />} />
            <Route path="/merchant/products" element={<MyProduct />} />
            <Route path="/search/products" element={<SearchProduct />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/detproduct" element={<DetailedProduct />} />
            <Route path="/mycart" element={<MyCart />} />
            <Route path="/user/orders" element={<MyOrder />} />
            <Route path="/user/wishlist" element={<Wishlist />} />
            <Route path="/test" element={<Test />} />
            <Route path="/admintools" element={<AdminTools />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
