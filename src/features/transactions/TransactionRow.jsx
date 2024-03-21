import { format } from "date-fns";
export default function TransactionRow({ transaction, products }) {
  const formattedDate = format(transaction.DATE, "dd-MM-yyyy");
  return (
    <tr
      className={`${
        transaction.PAYTYPE === "Credit" && "bg-red-100 text-red-800 "
      } ${transaction.PAYTYPE === "Cash" && "bg-green-100 text-green-800 "}
      ${
        transaction.PAYTYPE === "Google Pay" && "bg-yellow-100 text-amber-800 "
      } text-base   `}
    >
      <td>{transaction.TID}</td>
      <td>
        <div className='w-32'>
          {
            products?.find((product) => product.PID === transaction.PID)
              ?.PRODUCT_NAME
          }
        </div>
      </td>
      <td>{transaction.MRP}</td>
      <td>{transaction.QTY}</td>
      <td>{transaction.TOTAL_AMT}</td>
      <td>
        <div className='w-24'>{transaction.PAYTYPE}</div>
      </td>
      <td>
        <div className='w-24'>{formattedDate}</div>
      </td>
    </tr>
  );
}
