import { getTransactions } from "../../services/transactionApi";

export async function fetchTransactions() {
  try {
    const { data } = await getTransactions();
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}
