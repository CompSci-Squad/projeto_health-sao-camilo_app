import { supabase } from "../../supabase/supbase";

export const deleteAppointment = async (appointmentId: string) => {
  try {
    const { error } = await supabase
      .from("appointment")
      .delete()
      .eq("id", appointmentId);

    if (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
