import React from "react";
import SubmitButtton from "../../ui/SubmitButtton";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addPaytype } from "../../services/paytypeApi";

export default function AddPayType({ closeModal }) {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data) => onSubmit(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["payTypes"]);
      toast.success("New Payment Method Added");
    },
    onError: () => {
      toast.error("Didn't add Pay Type ");
    },
  });
  async function onSubmit(data) {
    if (window.confirm("Do really want to add this?")) {
      data = {
        ...data,
        status: data.status === "Active" ? 1 : 0,
      };
      try {
        await addPaytype(data);
        closeModal();
      } catch (err) {
        console.log(err);
      }
    } else {
      throw new Error("Don't want to add this");
    }
  }

  return (
    <>
      <h2 className="py-5 text-center">Add Pay Type</h2>
      <form
        className="flex  flex-col items-center gap-10"
        onSubmit={handleSubmit(mutate)}
      >
        <input
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="text"
          required
          placeholder="Method Name"
          id="name"
          {...register("name", { required: "This field is required" })}
        />

        <select
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          required
          placeholder="Status"
          id="status"
          {...register("status", {
            required: "This field is required",
          })}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <SubmitButtton>Add</SubmitButtton>
      </form>
    </>
  );
}
