import { ZodType, z } from "zod";

import { ProfileFormData } from "../../types/profileForm.type";
import { validateDate } from "../functions/validateDate";

export const updateProfileSchema: ZodType<ProfileFormData> = z.object({
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
});
