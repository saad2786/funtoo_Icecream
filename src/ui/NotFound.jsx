import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="font-heading text-3xl">Not Found 404</h1>
      <Link to="/">
        <button className="btn btn-accent btn-md mt-10 text-2xl">
          Go To Home
        </button>
      </Link>
    </div>
  );
}
