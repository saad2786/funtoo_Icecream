import React, { useState } from "react";

import Modal from "../ui/Modal";
import AddButton from "../ui/AddButton";
import AddProduct from "../features/Products/AddProduct";
import ProductRow from "../features/Products/ProductRow";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader";
import { fetchProducts } from "../features/Products/fetchProducts";
import EditProduct from "../features/Products/EditProduct";

export default function Products() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditDate] = useState({});
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  function openModal() {
    setIsOpenModal(true);
  }
  function closeModal() {
    setIsOpenModal(false);
  }
  function openEditModal({ PRODUCT_NAME, PID, MRP }) {
    const data = {
      id: PID,
      name: PRODUCT_NAME,
      price: MRP,
    };
    setEditDate(data);
    setIsOpenEdit(true);
  }
  function closeEditModal() {
    setIsOpenEdit(false);
  }

  if (isLoading) return <Loader />;
  return (
    <>
      <h2 className="font-sans mb-2 text-center text-2xl ">Products</h2>
      <div className="flex w-full items-center justify-end">
        <AddButton openModal={openModal}>+ Add</AddButton>
      </div>

      <div className="mt-4 max-h-[75vh] overflow-x-auto border-2 border-stone-500 sm:max-h-[65vh]">
        <table className="table bg-white ">
          <thead className=" bg-slate-600 text-slate-50">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>MRP</th>
              <th>Date</th>
              <th>Status </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              return (
                <ProductRow
                  product={product}
                  key={product.PID}
                  openModal={openEditModal}
                />
              );
            })}
          </tbody>
        </table>
        {isOpenModal && (
          <Modal closeModal={closeModal}>
            <AddProduct closeModal={closeModal} />
          </Modal>
        )}
        {isOpenEdit && (
          <Modal closeModal={closeEditModal}>
            <EditProduct data={editData} closeModal={closeEditModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
