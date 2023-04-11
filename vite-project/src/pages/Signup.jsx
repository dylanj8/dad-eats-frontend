import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const changeDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  const submitDets = async () => {
    try {
      let req = await fetch("http://localhost:5000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.username,
          password: user.password,
          email: user.email,
        }),
      });
      if (req) {
        const data = await req.json();
        console.log("Registered:", data);
        localStorage.setItem("token", data.token);
        navigate("/"); // redirect to homepage
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <h2>{user.username}</h2>
      <h3>{user.password}</h3>
      <h4>{user.email}</h4>
      <form action="">
        <label htmlFor="username">username</label>
        <input
          type="text"
          value={user.username}
          name="username"
          onChange={changeDetails}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={changeDetails}
        />
        <label htmlFor="email">email</label>
        <input
          type="text"
          value={user.email}
          name="email"
          onChange={changeDetails}
        />
      </form>
      <button onClick={submitDets}>submit</button>
    </div>
  );
};

export default Signup;
