import { getPaytypes } from "../../services/paytypeApi";

export async function fetchPayTypes() {
  try {
    const { data } = await getPaytypes();

    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}
