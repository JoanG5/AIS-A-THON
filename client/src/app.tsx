import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Form from "./pages/form";

const router = createHashRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/form",
        element: <Form />,
    }
])


createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );