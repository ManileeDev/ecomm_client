import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useContext } from "react";
import { AuthContext } from "./context/Authcontext";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import Chats from "./pages/Chats";
import { Helmet } from "react-helmet";
import ShowDetails from "./pages/ShowDetails";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import { CartContext } from "./context/CartContext";
import Orders from "./pages/Orders";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

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
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/"/>}
        />
      
        <Route
          path="/get-product/:id"
          element={<ShowDetails />}
        />
        <Route
          path="/managepassword"
          element={<ForgotPassword />}
        />
        <Route
          path="/resetpassword/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
