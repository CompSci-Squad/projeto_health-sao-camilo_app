import dayjs from "dayjs";
import { z } from "zod";

import { supabase } from "../supabase/supbase";
import { SignUpSchema } from "../validations/singupForm.validation";

type Payload = z.infer<typeof SignUpSchema>;

export const signUpUser = async (payload: Payload) => {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    console.log(error);

    if (error) return error;

    const { error: userError } = await supabase.from("user_info").insert([
      {
        name: payload.name,
        gender: payload.gender,
        birth_date: dayjs(payload.birthDate).format("YYYY-MM-DD"),
        auth_user_id: authData.user!.id,
      },
    ]);

    console.log(userError);
    if (userError) return userError;

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
    ]);
    return userData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
