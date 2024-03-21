import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
export default function PayTypeRow({ payType }) {
  const formattedDate = format(payType.DATE, "dd-MM-yyyy");
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handleToggle,
    onSuccess: () => {
      queryClient.invalidateQueries(["payTypes"]);
      toast.success("Status Changed");
    },
    onError: () => {
      toast.error("Somthing went wrong");
    },
  });
  async function handleToggle() {
    try {
      const data = {
        status: payType.ACTIVE ? 0 : 1,
        payTypeId: payType.PTID,
      };
      const response = await axios.put("http://localhost:8000/paytype", data);
      console.log(response);
    } catch (err) {
      console.log(err);
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
