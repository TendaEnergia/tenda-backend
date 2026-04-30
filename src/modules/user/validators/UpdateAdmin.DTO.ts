import { z } from "zod";

export const updateAdminSchema = z.object({
  full_name: z.string().min(3,"Nome muito curto").optional(),
  department: z.string().optional(),
});

export type UpdateAdminInput = z.infer<typeof updateAdminSchema>;