import { createBrowserRouter, redirect } from "react-router-dom";

import RootLayout from "./routerLayout";
import Home from "../views/home";
import Register from "../views/register";
import LoginPage from "../views/login";
import AddCart from "../views/addCart";
import MyCart from "../views/myCart";
import MyGame from "../views/myGame";
import UpdateCart from "../views/upadateform";

const Route = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      return localStorage.getItem("token") ? redirect("/") : null;
    },
  },
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      return !localStorage.getItem("token") ? redirect("/login") : null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-cart/:id",
        element: <AddCart />,
      },
      {
        path: "/myCart",
        element: <MyCart />,
      },
      {
        path: "/myGame",
        element: <MyGame />,
      },
      {
        path: "updateCart/:id",
        element: <UpdateCart />,
      },
    ],
  },
]);
export default Route;
