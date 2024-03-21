import React from "react";

export default function SubmitButtton({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="pb btn btn-outline btn-success rounded-xl px-3  py-2 text-base uppercase disabled:cursor-not-allowed disabled:bg-opacity-65 sm:w-[10vw]"
    >
      {children}
    </button>
  );
}
