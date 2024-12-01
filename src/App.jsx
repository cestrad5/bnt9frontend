import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import ListProducts from "./components/product/productList/ListProduct";
import SalesOrder from "./components/order/SalesOrder";
import Production from "./components/production/Production";
import OrderPdfList from "./components/OrderListPDFb/OrderPdfList";
import './App.css'

// Ensure credentials are sent with every request.
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  // Fetch user login status on app load.
  useEffect(() => {
    async function loginStatus() {
      try {
        const status = await getLoginStatus();
        dispatch(SET_LOGIN(status));
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer autoClose={1000} />

      {/* Define routes using the Routes component */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="resetpassword/:resetToken" element={<Reset />} />

        {/* Protected routes with Sidebar and Layout components */}
        <Route
          path="dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="orderPdfList"
          element={
            <Sidebar>
              <Layout>
                <OrderPdfList />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="listproducts"
          element={
            <Sidebar>
              <Layout>
                <ListProducts />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="order"
          element={
            <Sidebar>
              <Layout>
                <SalesOrder />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="productions"
          element={
            <Sidebar>
              <Layout>
                <Production />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
