import { supabase } from "../../supabase/supbase";

export const getExams = async (userId: string) => {
  try {
    const response = await supabase
      .from("exam")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (response?.status !== 200) {
      console.log(response);
      return null;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
