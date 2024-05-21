import dayjs from "dayjs";

import { ProfileFormData } from "../../types/profileForm.type";
import { supabase } from "../supabase/supbase";

export const updateProfile = async (
  { name, gender, birthDate }: ProfileFormData,
  id: string,
) => {
  try {
    const { error } = await supabase
      .from("user_info")
      .update({
        name,
        gender,
        birth_date: dayjs(birthDate).format("YYYY-MM-DD"),
      })
      .eq("id", id);
    if (error) throw error;

    const { data, error: userError } = await supabase
      .from("user_info")
      .select("*")
      .eq("id", id)
      .single();
    if (userError) throw error;

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
