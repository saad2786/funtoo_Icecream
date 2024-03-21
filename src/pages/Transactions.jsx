import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TransactionRow from "../features/transactions/TransactionRow";
import axios from "axios";
import Loader from "../ui/Loader";
import { FaFilter } from "react-icons/fa6";
import AddButton from "../ui/AddButton";
import Filters from "../ui/Filters";
import { useEffect } from "react";
import { compareAsc, format } from "date-fns";

export default function Transactions() {
  const [isOpenFilter, setIsOpenFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedPay, setSelectedPay] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const {
    data: transactions,
    isFetching: trnsactionsFetching,
    isLoading,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
  const { data: products, isFetching: productsFetching } = useQuery({
    queryKey: ["products"],
    queryFn: fetchItems,
  });
  const { data: payTypes, isFetching: payTypesFetching } = useQuery({
    queryKey: ["payTypes"],
    queryFn: fetchPayTypes,
  });

  useEffect(() => {
    setFilteredTransactions(transactions);
    if (selectedPay !== "") {
      setFilteredTransactions((prevs) => {
        return prevs.filter((prev) => prev.PAYTYPE == selectedPay);
      });
    }
    if (selectedProduct) {
      setFilteredTransactions((prevs) => {
        return prevs.filter((prev) => {
          console.log(prev.PID);
          return prev.PID == selectedProduct;
        });
      });
    }
  }, [selectedPay, selectedProduct, setSelectedPay, setSelectedProduct]);
  function filterByDate({ fromDate, toDate }) {
    fromDate = format(fromDate, "yyyy-MM-dd");
    toDate = format(toDate, "yyyy-MM-dd");

    setFilteredTransactions(() => {
      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.DATE);
        return (
          compareAsc(transactionDate, new Date(fromDate)) >= 0 &&
          compareAsc(transactionDate, new Date(toDate)) <= 0
        );
      });
    });
  }

  function toggleFilter() {
    setIsOpenFilters((prev) => !prev);
  }

  async function fetchPayTypes() {
    try {
      const response = await axios.get("http://localhost:8000/paytypes");
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
  async function fetchItems() {
    try {
      const response = await axios.get("http://localhost:8000/items");
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  const isFetching =
    trnsactionsFetching || productsFetching || payTypesFetching;
  if (isLoading) return <Loader />;
  return (
    <>
      <h2 className='text-center text-2xl font-sans mb-4 capitalize'>
        Transaction history
      </h2>
      <AddButton openModal={toggleFilter}>
        <FaFilter />
        Filter
      </AddButton>
      {isOpenFilter && (
        <Filters
          products={products}
          payTypes={payTypes}
          selectedPay={selectedPay}
          selectedProduct={selectedProduct}
          setSelectedPay={setSelectedPay}
          setSelectedProduct={setSelectedProduct}
          filterByDate={filterByDate}
        />
      )}
      <div
        className={`overflow-x-auto ${
          isOpenFilter ? "max-h-[55vh]" : "max-h-[75vh]"
        } border-2 border-stone-500 mt-4 sm:max-h-[65vh]`}
      >
        <table
          className=' table
       bg-white'
        >
          <thead className='w-full bg-slate-600 h-12 text-lg font-semibold text-slate-50'>
            <tr className='w-full'>
              <th>Sr. No.</th>
              <th>Product</th>
              <th>MRP</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Pay Type</th>
              <th>Date</th>
              {/* Adjust the width here */}
            </tr>
          </thead>

          <tbody>
            {filteredTransactions?.map((transaction) => {
              return (
                <TransactionRow
                  key={transaction.TID}
                  transaction={transaction}
                  products={products}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
