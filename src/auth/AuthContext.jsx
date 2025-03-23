// src/auth/AuthContext.js
import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const login = (username, password) => {
    if (username === "ihsakib" && password === "nb797##") {
      sessionStorage.setItem("loggedIn", true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("loggedIn");
    return true;
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
