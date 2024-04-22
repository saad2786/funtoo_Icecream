import supabase from "./supabase";

export const getProducts = async () => {
  try {
    let { data, status } = await supabase.from("products").select("*");

    return { data, status };
  } catch (error) {
    console.log(error.message);
  }
};

export const addProduct = async ({ name, price }) => {
  try {
    console.log(name, price);

    const { data, status } = await supabase
      .from("products")
      .insert([{ PRODUCT_NAME: name, MRP: price }]);

    return { data, status };
  } catch (error) {
    console.log(error.message);
  }
};

export const toggleProduct = async ({ itemId, status }) => {
  try {
    console.log(itemId, status);

    const {
      data,
      error,
      status: responseStatus,
    } = await supabase
      .from("products")
      .update({ ACTIVE: status })
      .eq("PID", itemId)
      .select();

    console.log(data, responseStatus, error);

    return { data, status: responseStatus };
  } catch (error) {
    console.log(error.message);
  }
};

export const editProdduct = async ({ id, name, price }) => {
  try {
    const {
      data,
      error,
      status: responseStatus,
    } = await supabase
      .from("products")
      .update({ PRODUCT_NAME: name, MRP: price })
      .eq("PID", id);

    return { data, status: responseStatus, error };
  } catch (error) {
    console.log(error.message);
  }
};
