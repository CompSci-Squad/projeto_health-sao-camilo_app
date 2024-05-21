import { Gender } from "./gender.enum";

export type ProfileFormData = {
  name: string;
  gender: Gender;
  birthDate: string;
};
