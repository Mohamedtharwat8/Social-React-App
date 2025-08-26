import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Profile from "../../Pages/Profile/Profile";
import Posts from "../../Pages/Posts/Posts";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../../Guard/ProtectedRoute";
import ProtectedAuth from "../../Guard/ProtectedAuth";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <ProtectedRoute>
            <PostDetails></PostDetails>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedAuth>
            <Profile />
          </ProtectedAuth>
        ),
      },
      {
        path: "/edit",
        element: (
          <ProtectedRoute>
            <Edit></Edit>
          </ProtectedRoute>
        ),
        children: [
          { path: "upload", element: <UploadPhoto></UploadPhoto> },
          { path: "change", element: <ChangePassword></ChangePassword> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
