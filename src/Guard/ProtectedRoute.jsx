import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { token } = useContext(AuthContext);
    if (token !== null) {
        return children;

    } else return <Navigate to={"/login"} replace={true}></Navigate>
}