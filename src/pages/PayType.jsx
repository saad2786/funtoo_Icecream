import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Modal from "../ui/Modal";
import AddButton from "../ui/AddButton";
import AddPayType from "../features/payType/AddPayType";
import PayTypeRow from "../features/payType/PayTypeRow";
import Loader from "../ui/Loader";

export default function Transactions() {
  const [isOpenModal, setIsOpenModal] = useState(false);
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
  function openModal() {
    setIsOpenModal(true);
  }
  function closeModal() {
    setIsOpenModal(false);
  }
  if (isFetching) return <Loader />;
  return (
    <>
      <h2 className='text-center text-2xl font-sans mb-4 capitalize'>
        Payment Methods Available
      </h2>
      <AddButton openModal={openModal}>+ Add</AddButton>
      <div className='overflow-x-auto mt-4 max-h-[75vh] border-2 border-stone-500'>
        <table className='table  bg-white'>
          <thead className=' bg-slate-600 text-slate-50'>
            <tr>
              <th>ID</th>
              <th>Method </th>
              <th>Status </th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payTypes?.map((payType) => {
              return <PayTypeRow key={payType.PTID} payType={payType} />;
            })}
          </tbody>
        </table>
        {isOpenModal && (
          <Modal closeModal={closeModal}>
            <AddPayType closeModal={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
