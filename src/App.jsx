import { RouterProvider } from "react-router-dom";
import routes from "./Components/AppRouter/AppRouter";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./Context/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <AuthContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
