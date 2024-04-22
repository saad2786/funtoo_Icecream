import supabase from "./supabase";

export const getUser = async ({ username, password }) => {
  try {
    let { data, status } = await supabase
      .from("members")
      .select("*")
      .eq("USERNAME", username)
      .eq("PASS", password)
      .single();

    return { data, status };
  } catch (error) {
    console.log(error.message);
  }
};
