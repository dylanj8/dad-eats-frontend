import { createContext, useState, useEffect, React } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //state values go up here
  const [authedUser, setAuthedUser] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setAuthedUser(username);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, authedUser, setAuthedUser }}>
      {children}
    </UserContext.Provider>
  );
};

//functions or reducer can go down here//
