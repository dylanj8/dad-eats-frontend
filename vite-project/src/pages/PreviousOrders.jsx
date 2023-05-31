import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PreviousOrders = () => {
  const [prevOrders, setPrevOrders] = useState(null);

  const userId = localStorage.getItem("userid");

  console.log(userId);

  const getPrevOrders = async () => {
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

  useEffect(() => {
    getPrevOrders();
  }, []);

  return (
    <div className="prev-orders-wrapper">
      <h1 className="prev-order-heading">Previous orders</h1>
      <div className="prev-orders">
        {prevOrders?.map((x, index) => {
          return (
            <div key={index} className="prev-order-div">
              {console.log(prevOrders)}
              <div className="order-text">
                <h2>Order:</h2>
                <h3>{x.text}</h3>
                <h2>Qty:</h2>
                <h3>{x.qty}</h3>
                <h2>Date ordered:</h2>
                <p>{x.date}</p>

                {/* <img src={x.img} alt={x.text} className="order-img" /> */}
              </div>
            </div>
          );
        })}
      </div>

      <div className="prev-order-btns">
        <Link to="/" className="logout-btn">
          Home
        </Link>
      </div>
    </div>
  );
};

export default PreviousOrders;
