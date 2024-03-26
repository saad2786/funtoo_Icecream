import React from "react";
// import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";
export default function MemberLayout() {
  return (
    <div className="h-screen w-screen bg-[#DDDDDD] px-6 py-10   ">
      <Outlet />
      {/* <BottomNav /> */}
    </div>
  );
}
