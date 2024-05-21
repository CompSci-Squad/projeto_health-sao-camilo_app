import { supabase } from "../../supabase/supbase";

export const getHomeDetailInformation = async (
  userId: string,
  type: "WEIGHT" | "HEIGHT" | "PRESSURE" | "GLUCOSE" | "IMC",
) => {
  try {
    switch (type) {
      case "HEIGHT":
        return await supabase
          .from("height")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
      case "PRESSURE":
        return await supabase
          .from("pressure")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
      case "WEIGHT":
        return await supabase
          .from("weight")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
      case "GLUCOSE":
        return await supabase
          .from("glucose")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
      case "IMC":

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
