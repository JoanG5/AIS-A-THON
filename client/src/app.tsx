import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import Login from "./pages/login";
import Form from "./pages/form";
import PatientData from "./pages/patientData";

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
    }
])


createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  );