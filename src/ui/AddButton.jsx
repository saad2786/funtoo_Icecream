import React from "react";

export default function AddButton({ children, openModal }) {
  return (
    <button
      className="btn btn-sm bg-indigo-500 text-base text-white    hover:bg-indigo-600 "
      onClick={() => openModal()}
    >
      {children}
    </button>
  );
}
