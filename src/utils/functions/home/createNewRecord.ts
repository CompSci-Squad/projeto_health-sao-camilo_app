import { supabase } from "../../supabase/supbase";

export const createNewRecord = async (
  userId: string,
  type: "HEIGHT" | "WEIGHT" | "GLUCOSE" | "PRESSURE",
  value: string,
) => {
  try {
    let response;
    if (type === "HEIGHT") {
      response = await supabase.from("height").insert([
        {
          user_id: userId,
          value: parseInt(value, 10),
        },
      ]);
    } else if (type === "WEIGHT") {
      response = await supabase.from("weight").insert([
        {
          user_id: userId,
          value: parseInt(value, 10),
        },
      ]);
    } else if (type === "GLUCOSE") {
      response = await supabase.from("glucose").insert([
        {
          user_id: userId,
          value: parseInt(value, 10),
        },
      ]);
    } else if (type === "PRESSURE") {
      response = await supabase.from("pressure").insert([
        {
          user_id: userId,
          value: parseInt(value, 10),
        },
      ]);
    }

    if (response?.status !== 201) {
      console.log(response);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
