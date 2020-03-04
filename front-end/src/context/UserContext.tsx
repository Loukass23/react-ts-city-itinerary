import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext([{}] as any);

export const UserProvider: React.FC = props => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const backendUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  console.log("backendUrl", backendUrl);

  const fetchUser = async (token: object) => {
    try {
      const res = await axios.get(`${backendUrl}users/auth`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = res.data;
      setUser(data);
    } catch (err) {}
  };

  useEffect(() => {
    // check if token exists in local storage
    const storageContent = localStorage.getItem("token");
    // if it exists, set it as token state
    if (storageContent !== "undefined" && storageContent !== null) {
      // fetch user and set state
      const token = JSON.parse(storageContent);
      fetchUser(token);
    }
  }, [token]);

  return (
    <UserContext.Provider value={[user, setUser, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
