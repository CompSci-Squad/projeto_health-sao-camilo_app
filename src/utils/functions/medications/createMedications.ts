import dayjs from "dayjs";

import { supabase } from "../../supabase/supbase";

export const createMedications = async (payload: {
  name: string;
  dosage: string;
  interval_in_hours: string;
  final_date: string;
  is_continuos: string;
  userId: string;
}) => {
  try {
    const [dia, mes, ano] = payload.final_date.split("/").map(Number);
    const date = dayjs(`${ano}-${mes}-${dia}`).toISOString();
    const { status, error } = await supabase.from("medicine").insert([
      {
        name: payload.name,
        dosage: payload.dosage,
        interval_in_minutes: parseInt(payload.interval_in_hours) * 60,
        final_date: date,
        is_continuos: payload.is_continuos === "Sim",
        user_id: payload.userId,
      },
    ]);

    if (status !== 201) {
      console.log(error);
      throw error;
    }
    return status;
  } catch (error) {
    console.log(error);
  }
};
