import React from "react";

export default function AddButton({ children, openModal }) {
  return (
    <div className='w-full flex items-center justify-end'>
      <button
        className='btn btn-sm btn-success text-white    text-base '
        onClick={() => openModal()}
      >
        {children}
      </button>
    </div>
  );
}
