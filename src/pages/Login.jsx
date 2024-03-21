import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  async function onSubmit(data) {
    try {
      const response = await axios.post("http://localhost:8000/login", data);
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
    <div className='px-4 h-screen flex flex-col items-center justify-center'>
      <h1 className='text-xl px-2 py-3 '>Hi, Welcome to Shree Datta Tea </h1>
      <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
        <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='username'
              className='input input-bordered'
              {...register("username", {
                required: "This field is required",
              })}
              required
              autoComplete='off'
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='password'
              className='input input-bordered'
              required
              {...register("password", {
                required: "This field is required",
              })}
              autoComplete='off'
            />
          </div>
          <div className='form-control mt-6'>
            <button className='btn btn-primary'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
