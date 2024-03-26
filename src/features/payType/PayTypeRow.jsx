import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function PayTypeRow({ payType }) {
  const formattedDate = format(new Date(payType.DATE), "dd-MM-yyyy");
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handleToggle,
    onSuccess: () => {
      queryClient.invalidateQueries(["payTypes"]);
      toast.success("Status Changed");
    },
    onError: () => {
      toast.error("Status didn't change!");
    },
  });
  async function handleToggle() {
    if (confirm("Do you really want to change status?")) {
      try {
        const data = {
          status: payType.ACTIVE ? 0 : 1,
          payTypeId: payType.PTID,
        };
        const response = await axios.put(`${BASE_URL}/paytype`, data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      throw new Error("Don't want to change status");
    }
  }
  return (
    <tr>
      <td>{payType.PTID}</td>
      <td>{payType.PAY_TYPE}</td>
      <td>
        <button
          className={` rounded-md ${
            payType.ACTIVE ? "bg-green-200" : "bg-red-200"
          } px-2 py-1 text-center text-xs  font-bold ${
            payType.ACTIVE ? "text-green-700" : "text-red-700"
          }  disabled:cursor-not-allowed sm:text-base`}
          onClick={mutate}
        >
          {payType.ACTIVE ? "Active" : "Deactive"}
        </button>
      </td>
      <td>{formattedDate}</td>
    </tr>
  );
}
