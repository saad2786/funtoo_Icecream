import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AdminLayout from "./ui/AdminLayout";
import MemberLayout from "./ui/MemberLayout";
import Dashboard from "./pages/Dashboard";
import PayType from "./pages/PayType";
import { Toaster } from "react-hot-toast";
import { Context } from "./context/ContextProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
export default function App() {
  const { user } = useContext(Context);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              !user ? (
                <Login />
              ) : user?.ROLE === 1 ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/member" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/admin/"
            element={user ? <AdminLayout /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="home" element={<Home />} />
            <Route path="product" element={<Products />} />
            <Route path="transaction" element={<Transactions />} />
            <Route path="paytype" element={<PayType />} />
          </Route>
          <Route
            path="/member/*"
            element={user ? <MemberLayout /> : <Navigate to="/login" />}
          >
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={20}
        containerStyle={toastContainerStyle}
        toastOptions={toastOptions}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
const toastContainerStyle = {
  fontSize: "18px",
  fontWeight: "700",
  fontFamily: "monospace",
  padding: "20px",
  margin: "20px",
  zIndex: "9999",
};

const toastOptions = {
  style: {
    width: "fit-content",
  },
  success: {
    duration: 3000,
    theme: {
      primary: "green",
      secondary: "black",
    },
  },
  error: {
    duration: 5000,
    theme: {
      primary: "red",
      secondary: "black",
    },
  },
};
