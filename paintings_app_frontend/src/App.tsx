import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AddPaintingPage from "./pages/AddPaintingPage";
import AllPaintingsPage from "./pages/AllPaintings/AllPaintingsPage";
import EditPaintingPage, {
  loader as editPaintingLoader,
} from "./pages/EditPaintingPage";
import MainLayout from "./pages/MainLayout";
import ViewPaintingPage, {
  loader as viewPaitingLoader,
} from "./pages/ViewPaintingPage";

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
          loader: viewPaitingLoader,
        },
        {
          path: "painting/edit/:id",
          element: <EditPaintingPage />,
          loader: editPaintingLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
