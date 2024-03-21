import React from "react";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";
export default function AdminLayout() {
  return (
    <div className='bg-[#DDDDDD] h-screen w-screen px-6 py-8  '>
      <Outlet />
      <BottomNav />
    </div>
  );
}
