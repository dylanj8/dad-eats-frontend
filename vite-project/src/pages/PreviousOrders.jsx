import React from "react";
import { useState } from "react";

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
    <div>
      <h1>Previous orders</h1>
      <div>
        {prevOrders?.map((x, index) => {
          return (
            <div>
              <h2>{x.text}</h2>
              <p>{x.createdAt}</p>
            </div>
          );
        })}
      </div>

      <div>
        <button onClick={getPrevOrders}>previous orders</button>
      </div>
    </div>
  );
};

export default PreviousOrders;
