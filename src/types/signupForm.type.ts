import { Gender } from "./gender.enum";

export type SignUpFormData = {
  email: string;
  password: string;
  name: string;
  gender: Gender;
  birthDate: string;
  weight: number;
  height: number;
};
