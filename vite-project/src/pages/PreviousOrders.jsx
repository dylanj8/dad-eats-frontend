import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const PreviousOrders = () => {
  const [prevOrders, setPrevOrders] = useState(null);

  const userId = localStorage.getItem("userid");

  console.log(userId);

  const getPrevOrders = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/orders/?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // Add the authorization header
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setPrevOrders(data);
      console.log(prevOrders);
    }
  };

  return (
    <div className="prev-orders-wrapper">
      <h1 className="prev-order-heading">Previous orders</h1>
      <div className="prev-orders">
        {prevOrders?.map((x, index) => {
          return (
            <div key={index} className="prev-order-div">
              {console.log(prevOrders)}
              <div className="order-text"></div>
              <h2>{x.text}</h2>
              <p>{x.qty}</p>
              {/* <p>{x.createdAt}</p> */}
            </div>
          );
        })}
      </div>

      <div>
        <button onClick={getPrevOrders}>previous orders</button>
        <Link to="/" className="logout-btn">
          Home
        </Link>
      </div>
    </div>
  );
};

export default PreviousOrders;
