import { User } from "@supabase/supabase-js";

import { supabase } from "../supabase/supbase";

export const uploadProfilePicture = async (file: File, user: User | null) => {
  if (!user) {
    return new Error("nenhum usuário logado");
  }
  const { data, error } = await supabase.storage
    .from("user_profile")
    .upload(`${user.id}/profile_picture`, file, {
      contentType: "image/jpeg",
    });
  if (error) {
    return new Error("Erro no upload da imagem", error);
  } else {
    return data.path;
  }
};
