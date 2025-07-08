import { createRoute } from "@tanstack/react-router"
import Register from "../../features/auth/Register"
import { rootRoute } from "../routeTree"

export const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register
})
