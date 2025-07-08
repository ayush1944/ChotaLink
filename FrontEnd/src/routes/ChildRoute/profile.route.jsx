import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../routeTree"
import Profile from "../../features/dashboard/Profile"
import { checkAuth } from "../../utils/helper"

export const ProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
  beforeLoad: checkAuth
})
