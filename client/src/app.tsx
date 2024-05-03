import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import Login from "./pages/login";
import Form from "./pages/form";
import PatientData from "./pages/patientData";
import Hub from "./pages/hub";
import Navbar from "./components/ui/navbar";

const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/form",
    element: (
      <>
        <Navbar />
        <Form />
      </>
    ),
  },
  {
    path: "/patient-data",
    element: (
      <>
        <Navbar />
        <PatientData />
      </>
    ),
  },
  {
    path: "/hub",
    element: <Hub />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
