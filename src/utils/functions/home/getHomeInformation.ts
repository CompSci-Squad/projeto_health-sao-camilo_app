import { supabase } from "../../supabase/supbase";

export const getHomeInformation = async (userId: string) => {
  try {
    return (
      await Promise.all([
        supabase
          .from("glucose")
          .select("value")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single(),
        supabase
          .from("height")
          .select("value")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single(),
        supabase
          .from("weight")
          .select("value")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single(),
        supabase
          .from("pressure")
          .select("numerator, denominator")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .single(),
      ])
    ).map((response) => {
      if (response.status !== 200) return null;
      else if ("numerator" in response!.data)
        return {
          numerator: response.data?.numerator,
          denominator: response.data?.denominator,
        };
      else return response.data?.value;
    });
  } catch (error) {
    console.log(error);
  }
};
