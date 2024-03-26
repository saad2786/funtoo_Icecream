export function fetchDetails(transactions, payTypes) {
  const details = payTypes?.map((payType) => {
    const amount = transactions
      ?.filter((transaction) => payType.PAY_TYPE === transaction.PAYTYPE)
      ?.reduce(
        (total, transaction) => total + Number(transaction.TOTAL_AMT),
        0,
      );
    return {
      id: payType.PTID,
      payType: payType.PAY_TYPE,
      amount: amount,
    };
  });
  const totalAmount = transactions?.reduce((total, transactions) => {
    total += transactions.TOTAL_AMT;
    return total;
  }, 0);
  const totalQty = transactions?.reduce((qty, transactions) => {
    qty += transactions.QTY;
    return qty;
  }, 0);
  return { details, totalAmount, totalQty };
}
