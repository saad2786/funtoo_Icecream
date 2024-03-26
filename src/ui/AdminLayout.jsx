import React from "react";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";
export default function AdminLayout() {
  return (
    <div className='bg-[#DDDDDD] min-h-screen w-screen px-6 py-8  '>
      <div className='w-full h-full mb-16 pb-10'>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
