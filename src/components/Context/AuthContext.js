import React from "react";
import { createContext, useState } from "react";

export const AuthUser = createContext(null);

const AuthContext = (props) => {
  const [user, setuser] = useState("Faruk Taiwo");
  const [auth, setauth] = useState("");

  const value = {
    user,
    setuser,
    auth,
    setauth,
  };
  return <AuthUser.Provider value={value}>{props.Children}</AuthUser.Provider>;
};

export default AuthContext;
