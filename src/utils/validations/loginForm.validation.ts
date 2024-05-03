import { ZodType, z } from "zod";

import { LoginFormData } from "../../types/loginForm.type";

export const LoginSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email({ message: "valor inserido deve ser um email" }),
  password: z
    .string()
    .min(8, { message: "senha deve ter no minimo 6 digitos" })
    .max(255, { message: "senha deve ter no maximo 255 digitos" }),
});
