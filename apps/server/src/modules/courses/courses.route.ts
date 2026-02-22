import { zValidator } from "@hono/zod-validator";
import { and, count, eq, isNull } from "drizzle-orm";
import { Hono } from "hono";
import { coursesTable, criteriaTable, criterionMarksTable, db } from "~/db";
import {
  createCourseSchema,
  getCourseSchema,
  getCoursesListSchema,
  patchCourseSchema,
  putCourseBgImageSchema,
} from "~/modules/courses/courses.schema";

const app = new Hono()
  .get("/", zValidator("query", getCoursesListSchema), async (c) => {
    const { page, limit } = c.req.valid("query");

    const [courses, totalResult] = await Promise.all([
      db
        .select({
          id: coursesTable.id,
          title: coursesTable.title,
          description: coursesTable.description,
          capacity: coursesTable.capacity,
          periodStart: coursesTable.periodStart,
          periodEnd: coursesTable.periodEnd,
          bgImage: coursesTable.bgImagePath,
        })
        .from(coursesTable)
        .where(isNull(coursesTable.deletedAt))
        .offset((page - 1) * limit)
        .limit(limit),

      db
        .select({ value: count() })
        .from(coursesTable)
        .where(isNull(coursesTable.deletedAt)),
    ]);

    const totalItems = totalResult[0].value;

    return c.json({
      items: courses,
      meta: {
        totalItems,
      },
    });
  })
  .get("/:id", zValidator("param", getCourseSchema), async (c) => {
    const { id } = c.req.valid("param");

    const course = await db.query.coursesTable.findFirst({
      where: and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)),
      columns: {
        id: true,
        title: true,
        description: true,
        capacity: true,
        periodStart: true,
        periodEnd: true,
        createdAt: true,
        bgImagePath: true,
      },
      with: {
        criteria: {
          where: isNull(criteriaTable.deletedAt),
          columns: {
            id: true,
            title: true,
          },
          with: {
            marks: {
              where: isNull(criterionMarksTable.deletedAt),
              columns: {
                id: true,
                label: true,
                mark: true,
              },
            },
          },
        },
      },
    });

    if (!course) return c.json({ error: { message: "Course not found" } }, 404);

    return c.json(course);
  })
  .post("/", zValidator("json", createCourseSchema), async (c) => {
    const validated = c.req.valid("json");

    await db.insert(coursesTable).values(validated);

    return c.json({}, 201);
  })
  .put(
    "/:id",
    zValidator("param", getCourseSchema),
    zValidator("form", putCourseBgImageSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const form = c.req.valid("form");

      const file = form.bgImage as File;
      const extension = file.type.split("/")[1];
      const fileName = `${crypto.randomUUID()}.${extension}`;
      const filePath = `/uploads/${fileName}`;

      await Bun.write(`./public${filePath}`, file);

      const updatedCourse = (
        await db
          .update(coursesTable)
          .set({ bgImagePath: filePath })
          .where(and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)))
          .returning()
      )[0];

      return updatedCourse
        ? c.json({}, 200)
        : c.json({ error: { message: "Course not found" } }, 404);
    },
  )
  .patch(
    "/:id",
    zValidator("param", getCourseSchema),
    zValidator("json", patchCourseSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const updates = c.req.valid("json");

      if (Object.keys(updates).length === 0)
        return c.json({ error: { message: "No changes provided" } }, 400);

      const updatedCourse = (
        await db
          .update(coursesTable)
          .set(updates)
          .where(and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)))
          .returning()
      )[0];

      return updatedCourse
        ? c.json({}, 200)
        : c.json({ error: { message: "Course not found" } }, 404);
    },
  )
  .delete("/:id", zValidator("param", getCourseSchema), async (c) => {
    const { id } = c.req.valid("param");

    const deletedCourse = (
      await db
        .update(coursesTable)
        .set({ deletedAt: new Date() })
        .where(and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)))
        .returning()
    )[0];

    return deletedCourse
      ? c.json({}, 200)
      : c.json({ error: { message: "Course not found" } }, 404);
  });

export default app;
