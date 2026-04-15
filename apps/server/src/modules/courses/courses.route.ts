import { zValidator } from "@hono/zod-validator";
import { and, count, eq, isNull, sql } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "~server/db";
import {
  coursesTable,
  criteriaTable,
  criterionMarksTable,
} from "~server/db/schema";
import {
  createCourseSchema,
  getCourseSchema,
  getCoursesListSchema,
  patchCourseSchema,
  putCourseBgImageSchema,
} from "~server/modules/courses/courses.schema";

const app = new Hono()
  .get("/", zValidator("query", getCoursesListSchema), async (c) => {
    const { page, limit } = c.req.valid("query");

    const [courses, metaData] = await Promise.all([
      db.query.coursesTable.findMany({
        where: isNull(coursesTable.deletedAt),
        columns: {
          id: true,
          title: true,
          description: true,
          capacity: true,
          periodStart: true,
          periodEnd: true,
          bgImagePath: true,
        },
        offset: (page - 1) * limit,
        limit: limit,
      }),

      db
        .select({ count: count() })
        .from(coursesTable)
        .where(isNull(coursesTable.deletedAt))
        .get(),
    ]);

    const totalItems = metaData ? metaData.count : 0;

    return c.json({
      items: courses,
      meta: {
        totalItems: totalItems,
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

    const defaultBgImagePath = "/uploads/default.jpeg";

    await db
      .insert(coursesTable)
      .values({ ...validated, bgImagePath: defaultBgImagePath });

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

      const updatedCourse = db
        .update(coursesTable)
        .set({ bgImagePath: filePath })
        .where(and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)))
        .returning()
        .get();

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

      const updatedCourse = db
        .update(coursesTable)
        .set(updates)
        .where(and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)))
        .returning()
        .get();

      return updatedCourse
        ? c.json({}, 200)
        : c.json({ error: { message: "Course not found" } }, 404);
    },
  )
  .delete("/:id", zValidator("param", getCourseSchema), async (c) => {
    const { id } = c.req.valid("param");

    const deletedCourse = db
      .update(coursesTable)
      .set({ deletedAt: sql`(current_timestamp)` })
      .where(and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)))
      .returning()
      .get();

    return deletedCourse
      ? c.json({}, 200)
      : c.json({ error: { message: "Course not found" } }, 404);
  });

export default app;
