import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function TransactionRow({
  transaction,
  products,
  serial,
  onSelect,
  isAllSelect,
}) {
  const formattedDate = format(
    new Date(transaction.DATE),
    "dd-MM-yyyy hh:mm a",
  );
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(isAllSelect);
  }, [isAllSelect]);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onSelect(transaction.TID, !isChecked);
  };

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
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="checkbox-error checkbox checkbox-xs bg-white"
        />
      </td>
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
          {transaction.CUSTOMER_NAME !== null ? transaction.CUSTOMER_NAME : "-"}
        </div>
      </td>
      <td>
        <div className="w-36">{formattedDate}</div>
      </td>
    </tr>
  );
}
