import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../component/Home";

const Layout = () => {
  return <Outlet />;
};

let router = createBrowserRouter([
  {
    path: "/",
    element: Layout(),
    children: [{ path: "/", element: <Home /> }],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
