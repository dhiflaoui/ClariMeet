import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  instructions: z.string().min(1, { message: "instructions are required" }),
});

export const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, { message: "ID is required" }),
});
