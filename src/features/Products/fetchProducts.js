export const fetchItems = async () => {
  try {
    const response = await axios.get("http://localhost:8000/items");
    dispatch({ type: "products", payload: response.data });
    setItems(response.data);
    initializeCounts(response.data);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};
