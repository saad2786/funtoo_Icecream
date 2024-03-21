import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

export const DatePicker = ({ control, name, placeholder }) => {
  return (
    <div className='w-full h-full'>
      <p>{placeholder}:</p>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <ReactDatePicker
            className='h-12 w-40 rounded-lg border border-solid  px-2 py-3 text-base font-semibold  focus:outline-none focus:ring-4 text-black  disabled:bg-opacity-65 '
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            dateFormat='yyyy-MM-dd'
            placeholderText={placeholder}
          />
        )}
      />
    </div>
  );
};
