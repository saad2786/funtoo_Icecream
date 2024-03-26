import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchTransactions() {
  try {
    const response = await axios.get(`${BASE_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}
