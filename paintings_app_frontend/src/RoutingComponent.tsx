import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "./app/MainLayout";
import LoginPage from "./app/authentication/LoginPage";
import RegisterPage from "./app/authentication/RegisterPage";
import AllPaintersPage from "./app/painters/AllPaintersPage";
import AddPainterPage from "./app/painters/add/AddPainterPage";
import ViewPainterPage from "./app/painters/details/ViewPainterPage";
import EditPainterPage from "./app/painters/edit/EditPainterPage";
import AllPaintingsPage from "./app/paintings/AllPaintingsPage";
import AddPaintingPage from "./app/paintings/add/AddPaintingPage";
import ViewPaintingPage from "./app/paintings/details/ViewPaintingPage";
import EditPaintingPage from "./app/paintings/edit/EditPaintingPage";
import DashboardLayout from "./components/layout/DashboardLayout";

export default function RoutingComponent() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="paintings" />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          element: (
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          ),
          children: [
            {
              path: "paintings",
              element: <AllPaintingsPage />,
            },
            {
              path: "painting/add",
              element: <AddPaintingPage />,
            },
            {
              path: "painting/details/:id",
              element: <ViewPaintingPage />,
            },
            {
              path: "painting/edit/:id",
              element: <EditPaintingPage />,
            },

            {
              path: "painters",
              element: <AllPaintersPage />,
            },
            {
              path: "painter/add",
              element: <AddPainterPage />,
            },
            {
              path: "painter/details/:id",
              element: <ViewPainterPage />,
            },
            {
              path: "painter/edit/:id",
              element: <EditPainterPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
