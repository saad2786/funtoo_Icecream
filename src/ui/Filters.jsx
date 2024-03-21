import React from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "./DatePicker";

export default function Filters({
  products,
  payTypes,
  selectedPay,
  selectedProduct,
  setSelectedPay,
  setSelectedProduct,
  filterByDate,
}) {
  const { handleSubmit, control } = useForm();
  function onSubmit(data) {
    filterByDate(data);
  }
  return (
    <div className=' px-5 py-6 bg-stone-400 rounded-md mt-4 text-white'>
      <form
        className='flex   items-center gap-4  w-full '
        onSubmit={handleSubmit(onSubmit)}
      >
        <DatePicker control={control} placeholder='From Date' name='fromDate' />
        <DatePicker control={control} placeholder='To Date' name='toDate' />
        <div className='w-full h-full'>
          <p>Product:</p>
          <select
            type='text'
            placeholder='Product'
            value={selectedProduct}
            onChange={(e) =>
              setSelectedProduct(e.target.selectedOptions[0].value)
            }
            className='input input-bordered w-40  max-w-xs  text-black'
          >
            <option value={0}>All</option>
            {products?.map((product) => (
              <option key={product.PID} value={product.PID}>
                {product.PRODUCT_NAME}
              </option>
            ))}
          </select>
        </div>
        <div className='w-full'>
          <p>Pay Type:</p>
          <select
            type='text'
            value={selectedPay}
            onChange={(e) => setSelectedPay(e.target.value)}
            className='input input-borderSd  w-full max-w-xs text-black'
          >
            {payTypes?.map((payType) => (
              <option key={payType.PTID}>{payType.PAY_TYPE}</option>
            ))}
          </select>
        </div>
        <button className='px-4 py-2 text-lg rounded-lg mt-6 bg-rose-600'>
          Filter
        </button>
      </form>
    </div>
  );
}
