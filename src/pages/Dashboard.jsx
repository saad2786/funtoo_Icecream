import React, { useContext, useEffect, useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";
import { fetchDetails } from "../features/dashboard/fetchDetails";
import ChartComponent from "../ui/ChartComponent";
import PieChart from "../ui/PieChart";
import BarChart from "../ui/BarChart";
import { fetchPayTypes } from "../features/payType/fetchPayTypes";
import { fetchTransactions } from "../features/transactions/fetchTransactions";
import { fetchProducts } from "../features/Products/fetchProducts";
import { DispatchContext } from "../context/ContextProvider";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  //REACT QUERY
  const { data: products, isLoading: productLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const { data: transactions, isLoading: transactionLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
  const { data: payTypes, payTypesFetching } = useQuery({
    queryKey: ["payTypes"],
    queryFn: fetchPayTypes,
  });

  // DASHBOARD DETAILS
  const [dashboardDetails, setDashboardDetails] = useState(null);

  useEffect(() => {
    if (transactions) {
      const details = fetchDetails(transactions, products);
      setDashboardDetails(details);
    }
  }, [transactions]);

  // JSX
  if (productLoading || transactionLoading || payTypesFetching)
    return <Loader />;
  return (
    <>
      <button
        className="absolute right-6 top-6 rounded-xl bg-rose-500 px-4 py-3 text-white"
        onClick={() => {
          sessionStorage.removeItem("user");
          dispatch({ type: "LOGIN_SUCCESS", payload: "" });
          navigate("/login");
        }}
      >
        Logout
      </button>

      <div className="stats mx-auto mb-4 mt-12 w-full bg-[#f9f5f5] px-1 py-3 text-secondary-content">
        <div className="stat">
          <div className="stat-title">Today's Buissness</div>
          <div className="stat-value flex items-center ">
            <MdOutlineCurrencyRupee size={30} />
            {dashboardDetails?.todayTransactionsAmount}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Buissness</div>
          <div className="stat-value flex items-center  ">
            <MdOutlineCurrencyRupee size={30} />
            {dashboardDetails?.totalTransactionsAmount}
          </div>
        </div>
      </div>
      <div className="stats mb-4 flex w-full  items-center justify-center bg-[#f9f5f5] py-4">
        <ChartComponent>
          <h2 className="text-xl font-semibold">Today's Sale</h2>
          <PieChart data={dashboardDetails?.todayTransactionsQty} />
        </ChartComponent>
      </div>
    </>
  );
}
