import supabase from "../supabase";

export async function insertTransaction(query) {
  const { data, error } = await supabase
    .from("TRANSACTION_MASTER")
    .insert([query])
    .select();
  console.log(data);
}
