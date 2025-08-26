import { useState, useEffect } from "react";
import { AuthContext } from "./Context";
import axios from "axios";

export default function AuthContextProvider({ children }) {
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(localToken || null);
  const [userData, setUserData] = useState(null);
  const getUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}users/profile-data`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(data);
      if (data.message === "success") {
        setUserData(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("Function TRigger");
    if (token !== null) {
      getUserProfileData();
    } else {
        setUserData(null);
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{ token, setToken, getUserProfileData, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
