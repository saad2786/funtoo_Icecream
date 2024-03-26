import React from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "./DatePicker";
import { addDays } from "date-fns";

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
    data = { ...data, toDate: addDays(new Date(data.toDate), 1) };
    filterByDate(data);
  }
  return (
    <div className=' px-5 py-6 bg-stone-400 rounded-md mt-4 text-white'>
      <form
        className='flex flex-wrap   items-center gap-4  w-full '
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='sm:flex flex-wrap items-center'>
          <DatePicker
            control={control}
            placeholder='From Date'
            name='fromDate'
          />
          <DatePicker control={control} placeholder='To Date' name='toDate' />
        </div>
        <div className='sm:flex flex-wrap items-center '>
          <div className='w-full h-full'>
            <p>Product:</p>
            <select
              type='text'
              placeholder='Product'
              value={selectedProduct}
              onChange={(e) =>
                setSelectedProduct(e.target.selectedOptions[0].value)
              }
              className='input input-bordered sm:w-44 w-36  max-w-xs  text-black'
            >
              <option value={0}>All</option>
              {products
                ?.filter((product) => product.ACTIVE)
                .map((product) => (
                  <option key={product.PID} value={product.PID}>
                    {product.PRODUCT_NAME}
                  </option>
                ))}
            </select>
          </div>
          <div className='w-full '>
            <p>Pay Type:</p>
            <select
              type='text'
              value={selectedPay}
              onChange={(e) => setSelectedPay(e.target.value)}
              className='input input-borderSd  sm:w-44 w-36 max-w-xs text-black'
            >
              <option value={0}>All</option>
              {payTypes
                ?.filter((payType) => payType.ACTIVE)
                .map((payType) => (
                  <option key={payType.PTID}>{payType.PAY_TYPE}</option>
                ))}
            </select>
          </div>
        </div>
        <div className='mx-auto'>
          <button className='px-4 py-2 text-lg rounded-lg mt-4 sm:mt-6 bg-rose-600'>
            Filter
          </button>
        </div>
      </form>
    </div>
  );
}
