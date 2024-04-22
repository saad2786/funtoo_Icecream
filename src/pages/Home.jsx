import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context, DispatchContext } from "../context/ContextProvider";
import { FaIceCream } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { toast } from "react-hot-toast";
import Modal from "../ui/Modal";
import AddCredit from "../features/Home/AddCredit";
import { FaPowerOff } from "react-icons/fa6";
import Loader from "../ui/Loader";
import { getProducts } from "../services/productApi";
import { addTransactions } from "../services/transactionApi";
import { getPaytypes } from "../services/paytypeApi";

const TeaShop = () => {
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState([]);
  const [payTypes, setPayTypes] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerName, setCustomerName] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(Context);
  console.log(user);

  const navigate = useNavigate();
  const filteredItems = items.filter((item) => item.ACTIVE);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    fetchItems();
    fetchPayTypes();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await getProducts();
      dispatch({ type: "products", payload: data });
      setItems(data);
      initializeCounts(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  async function fetchPayTypes() {
    try {
      const { data } = await getPaytypes();
      setPayTypes(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  const initializeCounts = (items) => {
    const initialCounts = items.map((item) => ({
      id: item.PID,
      count: 0,
      price: 0,
      pricePerUnit: item.MRP,
    }));

    setCounts(initialCounts);
    setTotalAmount(0);
  };
  function restCount() {
    if (window.confirm("Do you want to reset it?")) {
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

    setTotalAmount(
      (prevTotalAmount) =>
        prevTotalAmount +
          counts.find((item) => item.id === itemId)?.pricePerUnit || 0,
    );
  };
  const submitData = async (data) => {
    try {
      setIsLoading(true);
      await addTransactions(data);
      toast.success("Successfully Submitted");
      setIsLoading(false);
      initializeCounts(items);
    } catch (error) {
      console.error("Error submitting counts:", error);
      toast.error("Failed to submit counts. Please try again.");
      setIsLoading(false);
    }
  };
  const submitCredit = (e) => {
    e.preventDefault();
    const data = {
      items: counts,
      username: user.NAME,
      paymentMethod,
      customerName,
    };
    submitData(data);
    setCustomerName(null);
    closeModal();
  };
  const handleSubmit = async (paymentMethod) => {
    setPaymentMethod(paymentMethod);

    if (paymentMethod === "उधार") {
      openModal();
    } else {
      const data = {
        items: counts,
        username: user.NAME,
        paymentMethod,
        customerName,
      };
      submitData(data);
    }
  };
  function openModal() {
    setIsOpenModal(true);
  }
  function closeModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      {isLoading && <Loader />}
      <button
        className="absolute right-4 top-4 rounded-full bg-red-600 px-4 py-4 text-white hover:bg-red-500"
        onClick={() => {
          sessionStorage.removeItem("user");
          dispatch({ type: "LOGIN_SUCCESS", payload: "" });
          navigate("/login");
        }}
      >
        <FaPowerOff />
      </button>
      <h1 className="font-indi mt-8 flex items-center justify-center  text-center  text-7xl font-semibold text-red-900">
        Funtoo
        <span className="mb-3 flex items-start text-pink-400 ">
          <img src="/images/logo.png" alt="" className="w-36" />
        </span>
      </h1>

      {totalAmount ? (
        <div className="mx-auto mt-4 flex h-5  w-40  items-center  justify-center text-2xl font-semibold ">
          Total: <MdOutlineCurrencyRupee /> {totalAmount}
        </div>
      ) : (
        <div className="mx-auto mt-4 flex  h-5 w-40 items-center justify-center "></div>
      )}
      <div className="mt-2 flex max-h-[40vh] flex-wrap content-start items-start justify-center    gap-4 overflow-y-scroll  rounded-xl bg-slate-200  py-4 shadow-inner shadow-slate-600">
        {filteredItems?.map((item, index) => {
          const productCount = counts?.find((count) => count.id === item.PID);

          return (
            <button
              key={item.PID}
              className={`btn ${
                index % 2
                  ? "bg-[#865439] hover:bg-[#482d1e]"
                  : "bg-[#D2042D] hover:bg-[#912238] "
              }  h-fit w-[45%] px-3 py-4 font-marbtn text-[18px]  text-white`}
              onClick={() => handleItemClick(item.PID)}
            >
              {item.PRODUCT_NAME}
              {productCount?.count === 0 ? null : (
                <div className="badge h-8 w-8 text-center text-xl font-extrabold">
                  {productCount.count}
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
        {payTypes
          ?.filter((payType) => payType.ACTIVE)
          ?.map((payType) => {
            return (
              <button
                className="btn  bg-[#007F73] font-marbtn text-xl text-white hover:bg-[#1f4f42]"
                onClick={() => handleSubmit(payType.PAY_TYPE)}
                key={payType.PTID}
              >
                {payType.PAY_TYPE}
              </button>
            );
          })}
        <button className="btn btn-error w-24 text-xl" onClick={restCount}>
          RESET
        </button>
      </div>
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <AddCredit
            submitCredit={submitCredit}
            customerName={customerName}
            setCustomerName={setCustomerName}
          />
        </Modal>
      )}
    </>
  );
};

export default TeaShop;
