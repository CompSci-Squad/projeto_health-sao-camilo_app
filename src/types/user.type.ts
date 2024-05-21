export type User = {
  id: string;
  created_at: string;
  name: string;
  birth_date: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  auth_user_id: string | null;
  profile_picture_url: string | null;
};
