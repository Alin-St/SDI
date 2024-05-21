import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "./MainLayout";
import AllPaintingsPage from "./paintings/AllPaintingsPage";
import AddPaintingPage from "./paintings/add/AddPaintingPage";
import ViewPaintingPage from "./paintings/details/ViewPaintingPage";
import EditPaintingPage from "./paintings/edit/EditPaintingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="paintings" />,
        },
        {
          path: "paintings",
          element: <AllPaintingsPage />,
        },
        {
          path: "painting/add",
          element: <AddPaintingPage />,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
