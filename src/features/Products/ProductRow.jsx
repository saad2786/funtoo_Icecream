import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
export default function ProductRow({ product }) {
  const formattedDate = format(product.DATE, "dd-MM-yyyy");
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handleToggle,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Status Changed");
    },
    onError: () => {
      toast.error("Somthing went wrong");
    },
  });
  async function handleToggle() {
    try {
      const data = {
        status: product.ACTIVE ? 0 : 1,
        itemId: product.PID,
      };
      const response = await axios.put("http://localhost:8000/item", data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <tr key={product.PID}>
      <td className='w-fit'>{product.PID}</td>
      <td>
        <div className='w-28'>{product.PRODUCT_NAME}</div>
      </td>
      <td>{product.MRP}</td>
      <td>
        <div className='w-24'>{formattedDate}</div>
      </td>
      <td>
        <button
          className={` rounded-md ${
            product.ACTIVE ? "bg-green-200" : "bg-red-200"
          } px-2 py-1 text-center text-xs  font-bold ${
            product.ACTIVE ? "text-green-700" : "text-red-700"
          }  disabled:cursor-not-allowed sm:text-base`}
          onClick={mutate}
        >
          {product.ACTIVE ? "Active" : "Deactive"}
        </button>
      </td>
    </tr>
  );
}
