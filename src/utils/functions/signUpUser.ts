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

    await supabase.from("user_info").insert([
      {
        name: payload.name,
        gender: payload.gender,
        birth_date: payload.birthDate,
        auth_user_id: authData.user!.id,
      },
    ]);

    const { data: userData } = await supabase.from("user_info").select("*").eq("auth_user_id", authData.user!.id)

    const [] = await Promise.allSettled([
      supabase.from("height").insert([
        {
          user_id: userData.,
          value:
            typeof payload.height === "number"
              ? payload.height
              : parseInt(payload.height),
        },
      ]),
    ]);
  } catch (error) {}
};
