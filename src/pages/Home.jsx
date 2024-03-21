import React, { useState, useEffect, useContext } from "react";
import { FaGooglePay } from "react-icons/fa";
import axios from "axios";
import { DispatchContext } from "../context/ContextProvider";
import { GiCoffeeCup } from "react-icons/gi";

import { toast } from "react-hot-toast";
const TeaShop = () => {
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState([]);
  const filteredItems = items.filter((item) => item.ACTIVE);
  const dispatch = useContext(DispatchContext);
  console.log(counts);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/items");
      dispatch({ type: "products", payload: response.data });

      setItems(response.data);
      initializeCounts(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const initializeCounts = (items) => {
    const initialCounts = items.map((item) => ({
      id: item.PID,
      count: 0,
      price: 0,
      pricePerUnit: item.MRP,
    }));
    console.log(items);
    setCounts(initialCounts);
  };
  function restCount() {
    if (confirm("Do you want to reset it?")) {
      initializeCounts(items);
    }
  }
  const handleItemClick = (itemId) => {
    setCounts((prevCounts) =>
      prevCounts.map((prevCount) => {
        if (prevCount.id === itemId) {
          return {
            ...prevCount,
            count: prevCount.count + 1,
            price: prevCount.price + prevCount.pricePerUnit,
          };
        }
        return prevCount;
      }),
    );
  };

  const handleSubmit = async (paymentMethod) => {
    console.log(paymentMethod);

    const data = {
      items: counts,
      paymentMethod,
    };

    try {
      await axios.post("http://localhost:8000/submit", data);
      toast.success("Successfully Submitted");
      initializeCounts(items);
    } catch (error) {
      console.error("Error submitting counts:", error);
      toast.error("Failed to submit counts. Please try again.");
    }
  };

  return (
    <>
      <h1 className='text-center flex items-center gap-4 justify-center text-5xl font-semibold font-heading text-red-900'>
        श्री दत्त चहा
        <span className='flex items-start text-amber-700 mb-3'>
          <GiCoffeeCup />
        </span>
      </h1>
      <div className='flex items-start justify-center flex-wrap gap-4  max-h-[65vh] content-start  overflow-y-scroll mt-5'>
        {filteredItems?.map((item) => {
          const productCount = counts?.find((count) => count.id === item.PID);

          return (
            <button
              key={item.PID}
              className='btn bg-rose-500 text-white text-xl h-fit px-3 py-4 w-[45%] '
              onClick={() => handleItemClick(item.PID)}
            >
              {item.PRODUCT_NAME}{" "}
              {productCount?.count === 0 ? null : (
                <div className='badge w-8 h-8 text-center font-extrabold text-xl'>
                  {productCount.count}
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className='flex items-center justify-center flex-wrap gap-5 mt-12'>
        <button
          className='btn w-24 bg-[#ff8f00] text-white text-xl font-marbtn'
          onClick={(e) => handleSubmit(e.target.value)}
          value='Credit'
        >
          उधार
        </button>
        <button
          className='btn w-24 bg-[#ff8f00] text-white text-xl'
          onClick={(e) => handleSubmit(e.target.value)}
          value='Google Pay'
        >
          G Pay
        </button>
        <button
          className='btn w-24 bg-[#ff8f00] text-white text-xl font-marbtn'
          onClick={(e) => handleSubmit(e.target.value)}
          value='Cash'
        >
          रोख
        </button>
        <button className='btn btn-error w-24 text-xl' onClick={restCount}>
          RESET
        </button>
      </div>
    </>
  );
};

export default TeaShop;
