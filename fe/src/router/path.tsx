import { createBrowserRouter } from "react-router-dom";
import { DashboardPage, LoginPage } from "@/pages";
import { ProtectedRoute, AuthRoute } from "./auth-guard";
import Layout from "@/layout/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <AuthRoute />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
]);
