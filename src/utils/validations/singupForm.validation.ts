import dayjs from "dayjs";
import { ZodType, z } from "zod";

import { Gender } from "../../types/gender.enum";
import { SignUpFormData } from "../../types/signupForm.type";
import { validateDate } from "../functions/validateDate";

export const SignUpSchema: ZodType<SignUpFormData> = z.object({
  email: z.string().email({ message: "valor inserido deve ser um email" }),
  password: z
    .string()
    .min(8, { message: "senha deve ter no minimo 6 digitos" })
    .max(255, { message: "senha deve ter no maximo 255 digitos" }),
  name: z.string(),
  gender: z.nativeEnum(Gender),
  birthDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .refine(validateDate)
    .transform((value) => dayjs(value).format("YYYY-MM-DD")), // yyyy-mm-dd
  weight: z.string().transform((value) => parseInt(value, 10)),
  height: z.string().transform((value) => parseInt(value, 10)),
});
