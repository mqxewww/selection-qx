import { z } from "zod";

export const getCourseSchema = z.object({
  id: z.string().transform(Number),
});

export const createCourseSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  capacity: z.number().min(1),
  periodStart: z.iso.date(),
  periodEnd: z.iso.date(),
});

export const patchCourseSchema = z.object({
  title: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  capacity: z.number().min(1).optional(),
  periodStart: z.iso.date().optional(),
  periodEnd: z.iso.date().optional(),
});
