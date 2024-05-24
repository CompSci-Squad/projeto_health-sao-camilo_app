import { supabase } from "../../supabase/supbase";

export const getAppointment = async (appointmentId: string) => {
  const { data, error } = await supabase
    .from("appointment")
    .select("*")
    .eq("id", appointmentId)
    .single();

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};
