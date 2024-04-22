import { getProducts } from "../../services/productApi";

export async function fetchProducts() {
  try {
    const { data } = await getProducts();
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}
