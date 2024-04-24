import supabase from "./supabase";

export const getTransactions = async () => {
  try {
    let { data, status } = await supabase.from("transactions").select("*");
    return { data, status };
  } catch (error) {
    console.log(error.message);
  }
};

export const addTransactions = async ({
  items,
  username,
  paymentMethod,
  customerName,
}) => {
  const currDate = new Date().toISOString();

  try {
    const values = items
      .filter((item) => {
        return item.count >= 1;
      })
      .map((item) => {
        return {
          PID: item.id,
          MRP: item.pricePerUnit,
          TOTAL_AMT: item.price,
          QTY: item.count,
          PAYTYPE: paymentMethod,
          DATE: currDate,
          USERNAME: username,
          CUSTOMER_NAME: customerName,
        };
      });

    const { status, error } = await supabase
      .from("transactions")
      .insert(values);
    console.log(status, error);

    return { status, error };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTransactions = async ({ transactionIds }) => {
  try {
    console.log(transactionIds);

    const { error } = await supabase
      .from("transactions")
      .delete()
      .in("TID", transactionIds);

    console.log(error);
    return { error };
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
