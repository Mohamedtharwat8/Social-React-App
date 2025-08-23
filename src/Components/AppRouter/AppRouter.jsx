import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Profile from "../../Pages/Profile/Profile";
import Posts from "../../Pages/Posts/Posts";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";
import NotFound from "../NotFound/NotFound";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Posts /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
