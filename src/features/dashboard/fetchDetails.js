import { compareAsc, format } from "date-fns";
import { useState } from "react";

export function fetchDetails(transactions, products) {
  if (transactions) {
    const today = format(new Date(), "yyyy-MM-dd");
    const todayTransactionsAmount = transactions
      .filter((transaction) => {
        return compareAsc(new Date(transaction.DATE.slice(0, 10)), today) === 0
          ? transaction
          : null;
      })
      .reduce((amount, transaction) => amount + transaction.TOTAL_AMT, 0);

    const todayTransactionsQty = products
      ?.filter((product) => product.ACTIVE)
      ?.map((product) => {
        const quantity = transactions
          ?.filter(
            (transaction) =>
              product.PID === transaction.PID &&
              compareAsc(new Date(transaction.DATE.slice(0, 10)), today) === 0,
          )
          ?.reduce((total, transaction) => total + Number(transaction.QTY), 0);
        return {
          id: product.PID,
          product: product.PRODUCT_NAME,
          quantity: quantity,
        };
      });
    const totalTransactionsAmount = transactions.reduce(
      (amount, transaction) => amount + transaction.TOTAL_AMT,
      0,
    );
    return {
      todayTransactionsAmount,
      totalTransactionsAmount,
      todayTransactionsQty,
    };
  }
}
