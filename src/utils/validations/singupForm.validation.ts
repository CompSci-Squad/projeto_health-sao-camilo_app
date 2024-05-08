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
    .refine(validateDate),
  weight: z.string().refine((value) => !isNaN(parseFloat(value)), {
    message: "Not a valid number",
  }),
  height: z.string().refine((value) => !isNaN(parseFloat(value)), {
    message: "Not a valid number",
  }),
  pressure: z
    .string()
    .refine(
      (value) =>
        !isNaN(
          parseFloat(value.split("/")[0]) && parseFloat(value.split("/")[1]),
        ),
    ),
  glucose: z.string().refine((value) => !isNaN(parseFloat(value))),
});
