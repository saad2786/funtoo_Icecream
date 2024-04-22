import React from "react";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";
export default function AdminLayout() {
  return (
    <div className="min-w-screen min-h-screen bg-[#DDDDDD] px-6 py-8  ">
      <div className="mb-16 h-full w-full pb-10">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
