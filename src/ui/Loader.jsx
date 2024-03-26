import React from "react";

export default function Loader() {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-slate-200 bg-opacity-50 backdrop-blur-sm ">
      <span className="loading loading-bars loading-md"></span>
    </div>
  );
}
