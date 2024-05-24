import { supabase } from "../../supabase/supbase";

export const getAppointments = async (userId: string) => {
  const today = new Date().toISOString();

  try {
    const { data, error, status } = await supabase
      .from("appointment")
      .select("*")
      .eq("userId", userId)
      .gte("date", today)
      .order("created_at", { ascending: false });

    if (status !== 200 || error) {
      return error;
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
