import React from "react";
import SubmitButtton from "../../ui/SubmitButtton";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EditProduct({ closeModal, data }) {
  const { id, name, price } = data;
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data) => onSubmit(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Didn't add this Product");
    },
  });
  async function onSubmit(data) {
    if (confirm("Do really want to change this?")) {
      data = {
        ...data,
        id,
      };
      try {
        const response = await axios.put(`${BASE_URL}/updateProduct`, data);
        console.log(response);
        toast.success("Product Updated  ");
        closeModal();
      } catch (err) {
        throw new Error("Don't want to change this");
      }
    } else {
      throw new Error("Don't want to add this");
    }
  }
  return (
    <>
      <h2 className="py-5 text-center">Edit Product</h2>
      <form
        className="flex  flex-col items-center gap-10"
        onSubmit={handleSubmit(mutate)}
      >
        <input
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="text"
          required
          placeholder="Product Name"
          id="name"
          {...register("name", { required: "This field is required" })}
          defaultValue={name}
        />

        <input
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="number"
          required
          placeholder="Price"
          id="price"
          {...register("price", {
            required: "This field is required",
            min: 1,
          })}
          defaultValue={price}
        />

        <SubmitButtton>Update</SubmitButtton>
      </form>
    </>
  );
}
