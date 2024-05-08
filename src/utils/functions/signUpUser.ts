import { z } from "zod";

import { supabase } from "../supabase/supbase";
import { SignUpSchema } from "../validations/singupForm.validation";

type Payload = z.infer<typeof SignUpSchema>;

export const signUpUser = async (
  payload: Payload,
  setIsLoading: () => void,
) => {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    if (error) return error;

    await supabase.from("user_info").insert([
      {
        name: payload.name,
        gender: payload.gender,
        birth_date: payload.birthDate,
        auth_user_id: authData.user!.id,
      },
    ]);

    const { data: userData } = await supabase
      .from("user_info")
      .select("*")
      .eq("auth_user_id", authData.user!.id)
      .single();

    await Promise.allSettled([
      supabase.from("height").insert([
        {
          user_id: userData?.id,
          value: parseInt(payload.height, 10),
        },
      ]),
      supabase.from("weight").insert([
        {
          user_id: userData?.id,
          value: parseInt(payload.weight, 10),
        },
      ]),
      supabase.from("glucose").insert([
        {
          user_id: userData?.id,
          value: parseInt(payload.glucose, 10),
        },
      ]),
      supabase.from("pressure").insert([
        {
          user_id: userData?.id,
          numerator: parseInt(payload.pressure.split("/")[0], 10),
          denominator: parseInt(payload.pressure.split("/")[1], 10),
        },
      ]),
    ]);
    return userData;
  } catch (error) {
    console.log(error);
  }
};
