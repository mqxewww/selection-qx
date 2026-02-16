import { z } from "zod";

export const createCriterionMarkSchema = z.object({
  label: z.string().nonempty(),
  mark: z.number(),
});

export const patchCriterionMarkSchema = z.object({
  id: z.number().optional(),
  label: z.string().nonempty(),
  mark: z.number(),
  shouldDelete: z.boolean().optional(),
});
