import { decode } from "base64-arraybuffer";

import { supabase } from "../../supabase/supbase";

export const createExam = async (
  userId: string,
  category: string,
  examBase64: string,
  fileName: string,
) => {
  try {
    const { data, error } = await supabase.storage
      .from("exams")
      .upload(`${userId}/${fileName}`, decode(examBase64), {
        contentType: "application/pdf",
      });
    if (error) {
      console.log(error);
      return error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("exams").getPublicUrl(data.path);

    const { status, error: createError } = await supabase.from("exam").insert({
      user_id: userId,
      exam_url: publicUrl,
      category,
      exam_file_name: fileName,
    });

    if (status !== 201) {
      console.log(createError);
      return createError;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
