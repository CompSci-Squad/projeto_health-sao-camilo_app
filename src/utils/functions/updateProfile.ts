import { ProfileFormData } from "../../types/profileForm.type";
import { supabase } from "../supabase/supbase";

export const updateProfile = async (payload: ProfileFormData, id: string) => {
  try {
    const { error } = await supabase
      .from("user_info")
      .update(payload)
      .eq("id", id);
    if (error) throw error;

    const { data, error: userError } = await supabase
      .from("user_info")
      .select("*")
      .eq("id", id)
      .single();
    if (userError) throw error;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
