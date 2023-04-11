import { useState, useContext, useEffect } from "react";
import Signup from "./pages/Signup";
import Ordering from "./pages/Ordering";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PreviousOrders from "./pages/PreviousOrders";
import { UserContext } from "./context/Usercontext";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

function App() {
  const { authedUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  console.log(authedUser);

  const ProtectedRoute = ({ authedUser, children }) => {
    if (!authedUser && (!token || !name)) {
      return <Navigate to="/Login" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute authedUser={authedUser}>
            <Ordering />
          </ProtectedRoute>
        }
      />
      <Route path="Login" element={<Login />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/PreviousOrders" element={<PreviousOrders />} />
      {/* <Ordering /> */}
    </Routes>
  );
}

export default App;
