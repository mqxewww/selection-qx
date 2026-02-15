import { z } from "zod";
import {
  createCriterionMarkSchema,
  patchCriterionMarkSchema,
} from "~/modules/criterion-marks/criterion-marks.schema";

export const getCriteriaSchema = z.object({
  id: z.string().transform(Number),
});

export const createCriteriaSchema = z.object({
  title: z.string().nonempty(),
  marks: z.array(createCriterionMarkSchema).nonempty(),
  courseId: z.number(),
});

export const patchCriteriaSchema = z.object({
  title: z.string().nonempty().optional(),
  marks: z.array(patchCriterionMarkSchema).nonempty(),
});
