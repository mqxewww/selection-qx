import { z } from "zod";

export const getUsersListSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(5),
});

export const getUserSchema = z.object({
  id: z.string().transform(Number),
});

export const createUserSchema = z.object({
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  role: z.enum(["ADMIN", "EDITOR"]),
});

export const patchUserSchema = z.object({
  firstname: z.string().nonempty().optional(),
  lastname: z.string().nonempty().optional(),
  role: z.enum(["ADMIN", "EDITOR"]).optional(),
});
