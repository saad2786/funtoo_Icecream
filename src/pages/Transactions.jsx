/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TransactionRow from "../features/transactions/TransactionRow";

import Loader from "../ui/Loader";
import { FaFileExcel, FaFilter } from "react-icons/fa6";
import AddButton from "../ui/AddButton";
import Filters from "../ui/Filters";
import { useEffect } from "react";
import { compareAsc, format } from "date-fns";
import { fetchDetails } from "../features/transactions/fetchDetails";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { fetchTransactions } from "../features/transactions/fetchTransactions";
import { fetchProducts } from "../features/Products/fetchProducts";
import { fetchPayTypes } from "../features/payType/fetchPayTypes";
import { deleteTransactions } from "../services/transactionApi";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";

export default function Transactions() {
  const [isOpenFilter, setIsOpenFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedPay, setSelectedPay] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState([]);
  const [details, setDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);
  const tableRef = useRef(null);
  const queryClient = useQueryClient();
  //SORTED BY DECSENDING ORDER OF DATE

  //REACT QUERY
  const { data: transactions, isLoading: trnsactionsLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const { data: payTypes, isLoading: payTypesLoading } = useQuery({
    queryKey: ["payTypes"],
    queryFn: fetchPayTypes,
  });
  const onDeleteTransactions = async () => {
    const confirmation = window.confirm("Are you really want to delete?");
    if (!confirmation) {
      toast.error("Aborted delete transactions");
      setSelectedToDelete([]);
      return;
    }
    const { error } = await deleteTransactions({
      transactionIds: selectedToDelete,
    });
    if (error) {
      toast.error("Transactions deletion unsuccessfull");
    } else {
      toast.success("Successfully deleted transactions");
      setSelectedToDelete([]);
    }
  };
  const { mutate } = useMutation({
    mutationFn: onDeleteTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries(["trasactions"]);
    },
  });
  const sortedTransactions = filteredTransactions?.sort((a, b) => {
    const dateA = new Date(a.DATE);
    const dateB = new Date(b.DATE);
    return dateB - dateA;
  });

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);
  useEffect(() => {
    if (isAllChecked) {
      setSelectedToDelete(() =>
        filteredTransactions.map((transaction) => transaction.TID),
      );
      console.log(selectedToDelete);
    } else {
      setSelectedToDelete([]);
      console.log(selectedToDelete);
    }
  }, [isAllChecked]);

  useEffect(() => {
    const { details, totalAmount, totalQty } = fetchDetails(
      sortedTransactions,
      payTypes,
    );
    setDetails(details);
    setTotal(totalAmount);
    setQty(totalQty);
  }, [payTypes, sortedTransactions, transactions]);

  const onSelect = (transactionId, isChecked) => {
    if (isChecked) {
      setSelectedToDelete((prev) => [...prev, transactionId]);
      console.log(selectedToDelete);
    } else {
      setSelectedToDelete((prev) =>
        prev.filter((prevTransaction) => prevTransaction !== transactionId),
      );
      console.log(selectedToDelete);
    }
  };

  const onToggleAllChecked = () => {
    setIsAllChecked((prev) => !prev);
  };
  //FILTER BY DATE
  function filterByDate({ fromDate = null, toDate = null }) {
    setFilteredTransactions(transactions);
    if (fromDate !== null && toDate !== null) {
      fromDate = format(fromDate, "yyyy-MM-dd");
      toDate = format(toDate, "yyyy-MM-dd");
      setFilteredTransactions((prev) => {
        return prev.filter((transaction) => {
          const transactionDate = new Date(transaction.DATE);
          return (
            compareAsc(transactionDate, new Date(fromDate)) >= 0 &&
            compareAsc(transactionDate, new Date(toDate)) <= 0
          );
        });
      });
    }
    if (selectedPay != 0) {
      setFilteredTransactions((prevs) => {
        return prevs.filter((prev) => prev.PAYTYPE == selectedPay);
      });
    }
    if (selectedProduct != 0) {
      setFilteredTransactions((prevs) => {
        return prevs.filter((prev) => prev.PID == selectedProduct);
      });
    }
  }

  // TOGGLER
  function toggleFilter() {
    setIsOpenFilters((prev) => !prev);
  }

  const isLoading = trnsactionsLoading || productsLoading || payTypesLoading;
  if (isLoading) return <Loader />;
  return (
    <>
      <h2 className="font-sans mb-2 text-center text-2xl  capitalize">
        Transaction history
      </h2>
      <div className="flex w-full items-center justify-end gap-4">
        {selectedToDelete.length > 0 && (
          <button
            className="btn btn-error btn-sm text-base text-white "
            onClick={mutate}
          >
            <BiTrash />
            Delete
          </button>
        )}
        <AddButton openModal={toggleFilter}>
          <FaFilter />
          Filter
        </AddButton>
        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button className="btn btn-sm bg-teal-500 text-base text-white    hover:bg-teal-600">
            <FaFileExcel />
          </button>
        </DownloadTableExcel>
      </div>
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
          isOpenFilter ? "max-h-[45vh]" : "max-h-[65vh]"
        } mb-4 mt-4 border-2 border-stone-500 sm:max-h-[55vh]`}
      >
        <table
          ref={tableRef}
          className=" table rounded-none bg-white
       text-center"
        >
          <thead className="h-12 w-full bg-slate-600 text-lg font-semibold text-slate-50">
            <tr className="w-full">
              <th>
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={() => onToggleAllChecked()}
                  className="checkbox-error checkbox checkbox-xs bg-white"
                />
              </th>
              <th>Sr. No.</th>
              <th>Product</th>
              <th>MRP</th>
              <th>Qty.</th>
              <th>Amount</th>
              <th>Pay Type</th>
              <th>By</th>
              <th>Customer</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {sortedTransactions?.map((transaction, index) => {
              return (
                <TransactionRow
                  key={transaction.TID}
                  transaction={transaction}
                  serial={index + 1}
                  products={products}
                  isAllSelect={isAllChecked}
                  onSelect={onSelect}
                />
              );
            })}
          </tbody>
          <tfoot>
            <tr className="w-full text-base">
              <th></th>
              <th>Total=</th>
              <th></th>
              <th>{qty}</th>
              <th>{total}</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              {/* Adjust the width here */}
            </tr>
            <tr className="hidden">
              <th></th>
              <th className="flex items-center font-marbtn font-semibold text-red-700 ">
                Total Amount : <MdOutlineCurrencyRupee size={15} />
                {total}
              </th>
              {details?.map((detail, index) => {
                if (detail.amount)
                  return (
                    <th
                      className="flex items-center font-marbtn font-semibold text-black"
                      key={index}
                    >
                      {detail.payType} : <MdOutlineCurrencyRupee size={15} />
                      {detail.amount}
                    </th>
                  );
                return null;
              })}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="stats flex h-fit flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center font-marbtn font-semibold text-red-700 ">
          Total Amount : <MdOutlineCurrencyRupee size={15} />
          {total}
        </div>
        {details?.map((detail, index) => {
          if (detail.amount)
            return (
              <div
                className="flex items-center font-marbtn font-semibold text-black"
                key={index}
              >
                {detail.payType} : <MdOutlineCurrencyRupee size={15} />
                {detail.amount}
              </div>
            );
          return null;
        })}
      </div>
    </>
  );
}
