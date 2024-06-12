import { supabase } from "../../supabase/supbase";

export const getMedications = async (userId: string) => {
  const today = new Date().toISOString();

  try {
    const { data, error, status } = await supabase
      .from("medicine")
      .select("*")
      .eq("user_id", userId)
      .gte("final_date", today)
      .order("created_at", { ascending: false });

      console.log(data)

    if (status !== 200 || error) {
      return error;
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
