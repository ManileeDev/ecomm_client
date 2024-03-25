import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/Authcontext";
import { Provider } from "react-redux";
import { store } from "./config/store";
import { CartContextProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <CartContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CartContextProvider>

  </AuthContextProvider>
);
