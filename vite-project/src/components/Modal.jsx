import React from "react";
import { Link } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";

export function Modal({ logoutFnc, setModal, setShowModal }) {
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
            <button onClick={logoutFnc} className="logout-btn">
              Logout
            </button>
          </li>
          <li>
            <FaHamburger
              className="burger-icon"
              onClick={() => setShowModal(!setModal)}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
