import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContext, UserProvider } from "./context/Usercontext";
import { OrderProvider } from "./context/Ordercontext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
