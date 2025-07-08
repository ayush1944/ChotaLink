import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../routeTree"
import Login from "../../features/auth/Login"

export const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login
})
