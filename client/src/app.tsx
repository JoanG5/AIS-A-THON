import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import Login from "./pages/login";
import Form from "./pages/form";
import PatientData from "./pages/patientData";
import Hub from "./pages/hub";

const router = createHashRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/form",
        element: <Form />,
    },
    {
        path: "/patient-data",
        element: <PatientData />,
    },
    {
        path: "/hub",
        element: <Hub />,
    },
])


createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  );