import { useContext, createContext, useState, useEffect } from "react";
const stateContext = createContext({
  user: null,
  token: null,
  toastMessage: null,
  energyCount: null,
  currentResult: null,
  // isAdmin: true,
  settingCurrentResult: () => {},
  settingEnergyCount: () => {},
  settingToastMessage: () => {},
  settingToken: () => {},
  settingUser: () => {},
  // settingIsAdmin: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentResult, setCurrentResult] = useState(
    JSON.parse(localStorage.getItem("c_result"))
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(sessionStorage.getItem("access_token"));
  const [toastMessage, setToastMessage] = useState(
    localStorage.getItem("toastMessage")
  );
  const [energyCount, setEnergyCount] = useState(
    localStorage.getItem("energyCount")
  );
  // const [isAdmin, setIsAdmin] = useState(true);

  const settingToastMessage = (message) => {
    setToastMessage(message);
    if (message) {
      localStorage.setItem("toastMessage", message);
    } else {
      localStorage.removeItem("toastMessage");
    }
  };
  const settingEnergyCount = (val) => {
    setEnergyCount(val);
    if (val) {
      localStorage.setItem("energyCount", val);
    } else {
      localStorage.removeItem("energyCount");
    }
  };
  // const settingIsAdmin = (isAdmin) => {
  //   setIsAdmin(isAdmin);
  // };

  const settingToken = (token) => {
    setToken(token);
    if (token) {
      sessionStorage.setItem("access_token", token);
    } else {
      sessionStorage.removeItem("access_token");
    }
  };

  const settingUser = (user) => {
    setUser(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const settingCurrentResult = (result) => {
    setCurrentResult(result);
    if (result) {
      localStorage.setItem("c_result", JSON.stringify(result));
    }else{
      localStorage.removeItem("c_result");
    }
  };
  //for getting user

  return (
    <stateContext.Provider
      value={{
        toastMessage,
        settingToastMessage,
        user,
        settingUser,
        token,
        settingToken,
        energyCount,
        settingEnergyCount,
        currentResult,
        settingCurrentResult
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
