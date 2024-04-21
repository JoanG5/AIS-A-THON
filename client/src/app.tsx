import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";

const router = createHashRouter([
    {
        path: "/",
        element: <Login />,
    }
])


createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );