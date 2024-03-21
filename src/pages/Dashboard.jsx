import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader";

export default function Dashboard() {
  const { data: products, isFetching: productFetching } = useQuery({
    queryKey: ["products"],
    queryFn: fetchItems,
  });
  const { data: trasactions, isFetching: transactionFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
  const { data: payTypes, isFetching } = useQuery({
    queryKey: ["payTypes"],
    queryFn: fetchPayTypes,
  });

  async function fetchPayTypes() {
    try {
      const response = await axios.get("http://localhost:8000/paytypes");
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  async function fetchItems() {
    try {
      const response = await axios.get("http://localhost:8000/items");

      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  async function fetchTransactions() {
    try {
      const response = await axios.get("http://localhost:8000/transactions");
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  if (productFetching || transactionFetching) return <Loader />;
  return <div>Dashboard</div>;
}
