import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Modal from "../ui/Modal";
import AddButton from "../ui/AddButton";
import AddPayType from "../features/payType/AddPayType";
import PayTypeRow from "../features/payType/PayTypeRow";
import Loader from "../ui/Loader";
import { fetchPayTypes } from "../features/payType/fetchPayTypes";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Transactions() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: payTypes, isLoading } = useQuery({
    queryKey: ["payTypes"],
    queryFn: fetchPayTypes,
  });

  function openModal() {
    setIsOpenModal(true);
  }
  function closeModal() {
    setIsOpenModal(false);
  }
  if (isLoading) return <Loader />;
  return (
    <>
      <h2 className="font-sans mb-4 text-center text-2xl capitalize">
        Payment Methods Available
      </h2>
      <div className="flex w-full items-center justify-end">
        <AddButton openModal={openModal}>+ Add</AddButton>
      </div>
      <div className="mt-4 max-h-[75vh] overflow-x-auto border-2 border-stone-500">
        <table className="table  bg-white">
          <thead className=" bg-slate-600 text-slate-50">
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
