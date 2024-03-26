import { format } from "date-fns";
export default function TransactionRow({ transaction, products, serial }) {
  const formattedDate = format(transaction.DATE, "dd-MM-yyyy hh:mm a");
  return (
    <tr
      className={`${
        transaction.PAYTYPE === "उधार" && "bg-red-100 text-red-800 "
      } ${transaction.PAYTYPE === "रोख" && "bg-green-100 text-green-800 "}
      ${
        transaction.PAYTYPE !== "उधार" &&
        transaction.PAYTYPE !== "रोख" &&
        "bg-yellow-100 text-amber-800 "
      } text-base   `}
    >
      <td>{serial}</td>
      <td>
        <div className="w-32">
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
        <div className="w-24">{transaction.PAYTYPE}</div>
      </td>
      <td>
        <div className="w-24">{transaction.USERNAME}</div>
      </td>
      <td>
        <div className="w-24">
          {transaction.CUSTOMER_NAME !== "null"
            ? transaction.CUSTOMER_NAME
            : "-"}
        </div>
      </td>
      <td>
        <div className="w-36">{formattedDate}</div>
      </td>
    </tr>
  );
}
