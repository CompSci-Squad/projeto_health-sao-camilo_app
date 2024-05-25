import dayjs from "dayjs";
import { supabase } from "../../supabase/supbase";

export const createAppointment = async (payload: {
  specialty: string;
  date: string;
  time: string;
  address: any;
  reminder_type: "HOURS" | "DAYS";
  reminder_value: number;
  userId: string;
}) => {
  try {
    const currentYear = new Date().getFullYear();
    const [day, month] = payload.date.split("/").map(Number);
    const [hour, minute] = payload.time.split(":").map(Number);
    const date = dayjs(
      `${currentYear}-${month}-${day}T${hour}:${minute}`,
    ).toISOString();
    console.log(date);
    const { status, error } = await supabase.from("appointment").insert([
      {
        specialty: payload.specialty,
        date,
        address: payload.address,
        userId: payload.userId,
        reminder_type: payload.reminder_type,
        reminder_value: payload.reminder_value,
      },
    ]);

    if (status !== 201) {
      console.log(error);
      throw error;
    }
    return 201;
  } catch (error) {
    console.log(error);
  }
};
