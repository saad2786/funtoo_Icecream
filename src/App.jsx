import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
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

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin/' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='product' element={<Products />} />
            <Route path='transaction' element={<Transactions />} />
            <Route path='paytype' element={<PayType />} />
          </Route>
          <Route path='/member/*' element={<MemberLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position='top-center'
        gutter={20}
        containerStyle={{
          fontSize: "18px",
          fontWeight: "700",
          fontFamily: "monospace",
          padding: "20px",
          margin: "20px",
          zIndex: "9999",
        }}
        toastOptions={{
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
        }}
      />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
