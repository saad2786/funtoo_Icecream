import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DispatchContext } from "../context/ContextProvider";
import { GiCoffeeCup } from "react-icons/gi";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();
  async function onSubmit(data) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data);
      const payload = await response.data[0];
      dispatch({ type: "LOGIN_SUCCESS", payload: payload });
      sessionStorage.setItem("user", JSON.stringify(payload));
      if (response) {
        response.data[0].ROLE === 1
          ? navigate("/admin/")
          : navigate("/member/");
      } else console.log("Invalid username and password");
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  return (
    <div className="backgroundImage  flex h-screen w-screen flex-col items-center justify-center px-6 ">
      <div className="flex w-full flex-col items-center rounded-lg bg-slate-200 bg-opacity-50 px-4 py-6 backdrop-blur-sm  sm:w-96 sm:px-8">
        <h1 className="mb-4 flex items-center justify-center gap-4 text-center font-heading text-4xl font-semibold text-red-900">
          गुरु दत्त चहा
          <span className="mb-3 flex items-start text-amber-700">
            <GiCoffeeCup />
          </span>
        </h1>
        <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                {...register("username", {
                  required: "This field is required",
                })}
                required
                autoComplete="off"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password", {
                  required: "This field is required",
                })}
                autoComplete="off"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
