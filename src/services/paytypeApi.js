import supabase from "./supabase";

export const getPaytypes = async () => {
  try {
    let { data, status } = await supabase.from("paytypes").select("*");
    console.log(data, status);

    return { data, status };
  } catch (error) {
    console.log(error.message);
  }
};

export const addPaytype = async ({ name, status }) => {
  try {
    console.log(name, status);

    const { data, status: responseStatus } = await supabase
      .from("paytypes")
      .insert([{ PAY_TYPE: name, ACTIVE: status }]);

    return { data, status: responseStatus };
  } catch (error) {
    console.log(error.message);
  }
};

export const togglePaytype = async ({ payTypeId, status }) => {
  try {
    console.log(payTypeId, status);
    const {
      data,
      error,
      status: responseStatus,
    } = await supabase
      .from("paytypes")
      .update({ ACTIVE: status })
      .eq("PTID", payTypeId)
      .select();

    console.log(data, responseStatus, error);

    return { data, status: responseStatus };
  } catch (error) {
    console.log(error.message);
  }
};
