import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import ErrorPage from "../screens/ErrrorPage";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import ProductScreen from "../screens/Product";
import LoginScreen from "../screens/Login";
import checkAuth from "../utils";

export function Routers() {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "profile-screen",
      element: <ProfileScreen />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
    {
      path: "/product/:id",
      element: <ProductScreen />,
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "*",
      element: <Navigate to="/error" />,
    },
  ]);

  return routes;
}
