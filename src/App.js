import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import { useContext } from "react";
import { AuthContext } from "./context/Authcontext";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import Navbar from "./components/Navbar";
import Chats from "./pages/Chats";
import { Helmet } from "react-helmet";
import ShowDetails from "./pages/ShowDetails";
import CreateProduct from "./pages/CreateProduct";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import { CartContext } from "./context/CartContext";
import Orders from "./pages/Orders";

function App() {
  const { user } = useContext(AuthContext);
  const {cart} = useContext(CartContext)
  return (
    <BrowserRouter>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lee Store</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/address"
          element={user ? <Address/> : <Navigate to="/login" />}
        />
        <Route
          path="/payment"
          element={cart.length > 0 && user ? <Payment/> : <Navigate to="/cart" />}
        />
        <Route
          path="/chats"
          element={user ? <Chats /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={user ? <Orders/> : <Navigate to="/login" />}
        />
        <Route
          path="/favourites"
          element={user ? <Favourites /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home"/>}
        />
        <Route
          path="/create"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : user.role === "Admin" ? (
              <CreateProduct />
            ) : (
              <h3 className="text-center text-danger">
                Sorry don't have access
              </h3>
            )
          }
        />
        <Route
          path="/get-product/:id"
          element={<ShowDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
