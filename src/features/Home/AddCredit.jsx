import React from "react";

import SubmitButtton from "../../ui/SubmitButtton";

export default function AddCredit({
  submitCredit,
  setCustomerName,
  customerName,
}) {
  return (
    <>
      <h2 className="py-5 text-center">Customer Name</h2>
      <form
        className="flex  flex-col items-center gap-10"
        onSubmit={(e) => submitCredit(e)}
      >
        <input
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="text"
          required
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
        />

        <SubmitButtton>Add</SubmitButtton>
      </form>
    </>
  );
}
