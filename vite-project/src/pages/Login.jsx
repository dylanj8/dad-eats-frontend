import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/Usercontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currUser, setCurrUser] = useState("");
  const { user, setUser, setAuthedUser } = useContext(UserContext);
  // need to change this user, setuser to something else //
  //

  const navigate = useNavigate();

  const sendLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // Add the authorization header
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // login successful
        const data = await response.json();
        console.log("Logged in:", data);

        setAuthedUser(data.name);
        localStorage.setItem("username", data.name); // this is just test code //
        localStorage.setItem("userid", data._id);

        // store JWT token in local storage
        localStorage.setItem("token", data.token);

        // redirect to homepage
        navigate("/");
      } else {
        // login failed
        const errorData = await response.json();
        console.log("Login failed:", errorData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="login-wrapper">
        <form className="login-form">
          <label htmlFor="email">email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label htmlFor="password">password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={sendLogin} className="login-btn">
            Login
          </button>
          <Link to="/register" className="reg-btn">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
