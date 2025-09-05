import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }) {
  const { token } = useContext(AuthContext);
  if (token) return <Navigate to={"/"} replace={true}></Navigate>;
  return children;
}
