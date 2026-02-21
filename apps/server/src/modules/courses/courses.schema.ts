import { z } from "zod";

export const getCourseSchema = z.object({
  id: z.string().transform(Number),
});

export const createCourseSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  capacity: z.coerce.number().min(1),
  periodStart: z.iso.date(),
  periodEnd: z.iso.date(),
});

export const putCourseBgImageSchema = z.object({
  bgImage: z
    .any()
    .refine(
      (file) =>
        file && typeof file === "object" && "size" in file && "type" in file,
      "File format is not supported. Supported formats are jpg/jpeg, png, webp",
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size is too big. File size should be less than 5MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "File format is not supported. Supported formats are jpg/jpeg, png, webp",
    ),
});

export const patchCourseSchema = z.object({
  title: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  capacity: z.coerce.number().min(1).optional(),
  periodStart: z.iso.date().optional(),
  periodEnd: z.iso.date().optional(),
});
