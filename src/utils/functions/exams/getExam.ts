import { supabase } from "../../supabase/supbase";

export const getExam = async (examId: string) => {
  try {
    const response = await supabase
      .from("exam")
      .select("*")
      .eq("id", examId)
      .single();

    if (response?.status !== 200) {
      console.log(response);
      return null;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
