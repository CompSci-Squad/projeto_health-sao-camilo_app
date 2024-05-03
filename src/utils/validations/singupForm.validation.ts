import { ZodType, z } from "zod";

import { Gender } from "../../types/gender.enum";
import { SignUpFormData } from "../../types/signupForm.type";

export const SignUpSchema: ZodType<SignUpFormData> = z.object({
  email: z.string().email({ message: "valor inserido deve ser um email" }),
  password: z
    .string()
    .min(8, { message: "senha deve ter no minimo 6 digitos" })
    .max(255, { message: "senha deve ter no maximo 255 digitos" }),
  name: z.string(),
  gender: z.nativeEnum(Gender),
  birthDate: z.string().date("valor de data invalido"), // yyyy-mm-dd
  weight: z.number(),
  height: z.number().max(300, { message: "valor de altura invalido" }),
});
