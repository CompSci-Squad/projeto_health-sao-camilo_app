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
        return await calcImc(userId);
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const calcImc = async (userId: string) => {
  const heights = await supabase
    .from("height")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const weights = await supabase
    .from("weight")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (weights.status !== 200 || heights.status !== 200) return null;

  if (weights.data.length <= heights.data.length) {
    const values = weights.data.map((weight, index) => ({
      created_at: weight.created_at,
      value: (weight?.value / (heights.data[index]?.value / 100) ** 2).toFixed(
        2,
      ),
    }));
    return { status: 200, data: values };
  }

  if (heights.data.length <= weights.data.length) {
    const values = heights.data.map((height, index) => ({
      created_at: height.created_at,
      value: (height?.value / (weights.data[index]?.value / 100) ** 2).toFixed(
        2,
      ),
    }));
    return { status: 200, data: values };
  }
};
