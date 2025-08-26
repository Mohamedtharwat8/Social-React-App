import { RouterProvider } from "react-router-dom";
import routes from "./Components/AppRouter/AppRouter";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./Context/AuthContextProvider";

function App() {
  return (
    <>
      <ToastContainer />
      <AuthContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
