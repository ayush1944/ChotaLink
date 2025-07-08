
import { getCurrentUser } from "../api/createShortUrl";
import { login } from "../store/slice/authSlice";
import { redirect } from "@tanstack/react-router";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;

    if (!queryClient) throw new Error("queryClient is missing from context");
    if (!store) throw new Error("store is missing from context");

    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });

    if (!user) return false;

    store.dispatch(login(user));
    const { isAuthenticated } = store.getState().auth;

    if (!isAuthenticated) return false;

    return true;
  } catch (error) {
    console.error("checkAuth error:", error);
    return redirect({ to: "/login" });
  }
};
