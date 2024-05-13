import { ZodType, z } from "zod";

import { SignUpFormData } from "../../types/signupForm.type";
import { validateDate } from "../functions/validateDate";

export const SignUpSchema: ZodType<SignUpFormData> = z.object({
  email: z.string().email({ message: "valor inserido deve ser um email" }),
  password: z
    .string()
    .min(8, { message: "senha deve ter no minimo 6 digitos" })
    .max(255, { message: "senha deve ter no maximo 255 digitos" }),
  name: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  birthDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .refine(validateDate)
    .transform((value) => {
      const parts = value.split("/");
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[0], 10);
      const year = parseInt(parts[2], 10);

      // Create a new Date object and check if it's a valid date
      return new Date(year, month - 1, day).toISOString();
    }),
  weight: z.string().refine((value) => !isNaN(parseFloat(value)), {
    message: "Not a valid number",
  }),
  height: z.string().refine((value) => !isNaN(parseFloat(value)), {
    message: "Not a valid number",
  }),
});
