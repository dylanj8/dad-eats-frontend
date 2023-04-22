import React from "react";
import { Link } from "react-router-dom";

export function Modal({ logoutFnc }) {
  return (
    <>
      <div className="modal">
        <ul>
          <li className="modal-btn">
            <Link to="/Orders" className="modal-btn">
              Order
            </Link>
          </li>
          <li className="modal-btn">
            <Link to="/PreviousOrders" className="modal-btn">
              Previous orders
            </Link>
          </li>

          <li className="modal-btn">
            <button onClick={logoutFnc} className="modal-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
