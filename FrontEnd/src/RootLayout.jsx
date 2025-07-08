import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Context from "./utils/context";
import { Outlet } from "@tanstack/react-router";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <Context.Provider value={{ toast }}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          <Outlet />
        </QueryClientProvider>
      </Context.Provider>
    </BrowserRouter>
  );
}
