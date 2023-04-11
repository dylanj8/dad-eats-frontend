import React from "react";
import { useContext } from "react";
import { OrderContext } from "../context/Ordercontext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Orders = () => {
  const { order } = useContext(OrderContext);
  const navigate = useNavigate();
  console.log(order);

  const sendOrder = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the authorization header
        },
        body: JSON.stringify({
          text: order[0].name,
        }),
      });
      console.log("Request Body: ", JSON.stringify({ text: order[0].name }));
      console.log("Request Headers: ", JSON.stringify(response.headers));

      if (response.ok) {
        // login successful
        const data = await response.json();
        console.log("Order submitted:", data);

        // redirect to homepage
        navigate("/");
      } else {
        // login failed
        const errorData = await response.json();
        console.log("Order failed:", errorData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders-page">
      <h1>Current Order</h1>
      <div>
        <table className="order-table">
          <thead>
            <tr>
              <td>Meal</td>
              <td>Qty</td>
            </tr>
          </thead>
          <tbody className="table-body">
            {order && order.length > 0 ? (
              order.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>{" "}
                </tr>
              ))
            ) : (
              <h2>No orders</h2>
            )}
          </tbody>
        </table>
        <div className="btn-div">
          <button onClick={sendOrder} className="order-btn">
            Place Order
          </button>
          <Link to="/" className="menu-btn">
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
