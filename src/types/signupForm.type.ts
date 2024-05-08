import { Gender } from "./gender.enum";

export type SignUpFormData = {
  email: string;
  password: string;
  name: string;
  gender: Gender;
  birthDate: string;
  weight: string;
  height: string;
  pressure: string;
  glucose: string;
};
