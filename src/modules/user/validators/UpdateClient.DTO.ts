import { z } from "zod";

export const updateClientSchema = z.object({
  full_name: z.string().min(3, "Nome muito curto").optional(),
  phone: z.string().min(10, "Telefone inválido").optional(),
  // Note que não incluímos e-mail ou senha aqui para segurança, fazer uma rota separada pra isso
});

export type UpdateClientInput = z.infer<typeof updateClientSchema>;