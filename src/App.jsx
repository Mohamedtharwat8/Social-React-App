import { RouterProvider } from "react-router-dom"
import routes from "./Components/AppRouter/AppRouter"
 

function App() {
 
  return (
    <>
      <RouterProvider router={routes} ></RouterProvider >
    </>
  );
}

export default App
