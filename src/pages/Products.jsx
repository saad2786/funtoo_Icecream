import React, { useState } from "react";

import axios from "axios";
import Modal from "../ui/Modal";
import AddButton from "../ui/AddButton";
import AddProduct from "../features/Products/AddProduct";
import ProductRow from "../features/Products/ProductRow";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader";

export default function Products() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    data: products,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchItems,
  });

  async function fetchItems() {
    try {
      const response = await axios.get("http://localhost:8000/items");
      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
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
      <h2 className='text-center text-2xl font-sans mb-4 '>Products</h2>
      <AddButton openModal={openModal}>+ Add</AddButton>

      <div className='overflow-x-auto mt-4 max-h-[75vh] border-2 border-stone-500 sm:max-h-[65vh]'>
        <table className='table bg-white '>
          <thead className=' bg-slate-600 text-slate-50'>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>MRP</th>
              <th>Date</th>
              <th>Status </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              return <ProductRow product={product} key={product.PID} />;
            })}
          </tbody>
        </table>
        {isOpenModal && (
          <Modal closeModal={closeModal}>
            <AddProduct closeModal={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
