import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { OrderContext } from "../context/Ordercontext";
import { UserContext } from "../context/Usercontext";
import { FaHamburger } from "react-icons/fa";
import { Modal } from "../components/Modal";

const Ordering = () => {
  const [readmore, setReadMore] = useState(false);
  const [selectedindex, setSelectedIndex] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const { order, setOrder } = useContext(OrderContext);
  const { authedUser, setAuthedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const logoutFnc = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setAuthedUser(null);
    navigate("/", { replace: true });
    window.location.reload(); // force refresh the page
  };

  const setModal = () => {
    setShowModal(!showModal);
  };

  const readMore = (id) => {
    setSelectedIndex(id);
    setReadMore(!readmore);
  };

  const addToOrder = (meal) => {
    const inOrder = order.find((x) => x.id === meal.id);
    if (order.length > 2) {
      return;
    }

    if (inOrder) {
      // if (inOrder.qty > 2) {
      //   return;
      // }
      setOrder(
        order.map((x) => {
          return inOrder.id === x.id
            ? { ...inOrder, qty: (inOrder.qty = inOrder.qty + 1) }
            : x;
        })
      );
    } else {
      setOrder([...order, { ...meal, qty: 1 }]);
    }
  };

  const mainMenu = [
    {
      id: 1,
      name: "steak meal",
      img: "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      name: "steak meal",
      img: "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      name: "steak meal",
      img: "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 4,
      name: "steak meal",
      img: "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 5,
      name: "steak meal",
      img: "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 6,
      name: "steak meal",
      img: "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 7,
      name: "steak meal",
      img: "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  return (
    <div className="ordering-wrapper">
      <header>
        <h1 id="nav-title">Paul Eats</h1>
        <nav>
          <ul>
            <li className="hide-btn">
              <Link to="/Orders">Order</Link>
            </li>
            <li className="hide-btn">
              <Link to="/PreviousOrders">Previous orders</Link>
            </li>

            <li className="hide-btn">
              {authedUser ? (
                <button onClick={logoutFnc} className="logout-btn">
                  Logout
                </button>
              ) : (
                <Link to="/Login" />
              )}
            </li>
            <li className="burg-btn">
              {" "}
              <FaHamburger onClick={setModal} />
            </li>
          </ul>
        </nav>
      </header>

      <div className="ordering-title">
        {showModal && <Modal logoutFnc={logoutFnc} className="modal" />}
        <h1>Pick upto 2 main meals</h1>
      </div>
      <div className="orders">
        {mainMenu.map((meals, idx) => {
          return (
            <div key={idx} className="card">
              <h2>{meals.name}</h2>
              <img src={meals.img} alt={meals.name} />
              <p>
                {readmore && selectedindex === idx
                  ? meals.description
                  : meals.description.substring(0, 25) + "..."}
              </p>
              <div className="meal-btns">
                <button onClick={() => readMore(idx)} className="read-btn">
                  {readmore ? "hide" : "read more"}
                </button>
                <button onClick={() => addToOrder(meals)} className="order-btn">
                  order
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ordering-title">
        <h1>Pick upto 2 light meals</h1>
      </div>
      <div className="orders">
        {mainMenu.map((meals, idx) => {
          return (
            <div key={idx} className="card">
              <h2>{meals.name}</h2>
              <img src={meals.img} alt={meals.name} />
              <p>
                {readmore && selectedindex === idx
                  ? meals.description
                  : meals.description.substring(0, 25) + "..."}
              </p>
              <div className="meal-btns">
                <button onClick={() => readMore(idx)} className="read-btn">
                  {readmore ? "hide" : "read more"}
                </button>
                <button onClick={() => addToOrder(meals)} className="order-btn">
                  order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ordering;
