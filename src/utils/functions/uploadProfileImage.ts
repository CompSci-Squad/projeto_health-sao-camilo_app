import { decode } from "base64-arraybuffer";

import { User } from "../../types/user.type";
import { supabase } from "../supabase/supbase";

export const uploadProfileImage = async (base64File: string, user: User) => {
  try {
    console.log("user profile picture: ", user.profile_picture_url);
    if (!user.profile_picture_url) {
      const { data, error } = await supabase.storage
        .from("user_profile")
        .upload(`${user.id}/profilePicture.jpeg`, decode(base64File), {
          contentType: "image/jpeg",
        });

      const { error: userError } = await supabase
        .from("user_info")
        .update({ profile_picture_url: data?.path })
        .eq("id", user.id);

      if (error) {
        console.error("Upload failed:", error);
        alert("Image upload failed. Please try again.");
        return error;
      }

      if (userError) {
        console.error("Upload failed:", userError);
        alert("Image upload failed. Please try again.");
        return userError;
      }
      return data.path;
    }

    const { data, error } = await supabase.storage
      .from("user_profile")
      .update(`${user.id}/profilePicture.jpeg`, decode(base64File), {
        contentType: "image/jpeg",
        upsert: true,
      });

    const { error: userError } = await supabase
      .from("user_info")
      .update({ profile_picture_url: data?.path })
      .eq("id", user.id);

    if (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed. Please try again.");
      return error;
    }

    if (userError) {
      console.error("Upload failed:", userError);
      alert("Image upload failed. Please try again.");
      return userError;
    }

    console.log("Image uploaded successfully:", data);
    return data.path;
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during upload. Please try again.");
  }
};
