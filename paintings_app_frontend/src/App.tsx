import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AddPaintingPage from "./components/AddPaintingPage";
import AllPaintingsPage from "./components/AllPaintingsPage";
import EditPaintingPage, {
  loader as editPaintingLoader,
} from "./components/EditPaintingPage";
import LayoutComponent from "./components/LayoutComponent";
import ViewPaintingPage, {
  loader as viewPaitingLoader,
} from "./components/ViewPaintingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent />,
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
