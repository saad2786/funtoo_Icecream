import React, { useState } from "react";

export default function Modal({ children, closeModal }) {
  // Manage modal state using useState

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-gray-600 bg-opacity-55 ">
      <div className="relative h-fit w-[80vw] rounded-lg bg-slate-100 px-8 py-24 sm:w-[40vw]">
        {children}
        <button
          className="btn btn-circle btn-ghost btn-md absolute right-4 top-4"
          onClick={closeModal}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
