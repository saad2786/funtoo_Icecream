import React from "react";

export default function Loader() {
  return (
    <div className='h-full w-full absolute flex items-center justify-center backdrop-blur-sm top-0 left-0 '>
      <span className='loading loading-bars loading-md'></span>
    </div>
  );
}
