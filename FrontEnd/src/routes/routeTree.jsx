import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import { HomeRoute } from "./ChildRoute/home.route";
import { RegisterRoute } from "./ChildRoute/register.route";
import { ProfileRoute } from "./ChildRoute/profile.route";
import { LoginRoute } from "./ChildRoute/login.route";
import { DashboardRoute } from "./ChildRoute/dashboard.route";

export const rootRoute = createRootRoute({
  component: RootLayout
})

export const routeTree = rootRoute.addChildren([
  HomeRoute,
  LoginRoute,
  RegisterRoute,
  ProfileRoute,
  DashboardRoute
])