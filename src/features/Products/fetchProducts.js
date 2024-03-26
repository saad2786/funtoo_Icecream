import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchProducts() {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}
