import { zValidator } from "@hono/zod-validator";
import { and, eq, isNull } from "drizzle-orm";
import { Hono } from "hono";
import { coursesTable, db } from "~/db";
import {
  createCourseSchema,
  getCourseSchema,
  patchCourseSchema,
} from "~/modules/courses/courses.schema";

const app = new Hono();

app.get("/", async (c) => {
  const courses = await db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      description: coursesTable.description,
      capacity: coursesTable.capacity,
      periodStart: coursesTable.periodStart,
      periodEnd: coursesTable.periodEnd,
    })
    .from(coursesTable)
    .where(isNull(coursesTable.deletedAt));

  return c.json(courses);
});

app.get("/:id", zValidator("param", getCourseSchema), (c) => {
  const { id } = c.req.valid("param");

  const course = db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      description: coursesTable.description,
      capacity: coursesTable.capacity,
      periodStart: coursesTable.periodStart,
      periodEnd: coursesTable.periodEnd,
    })
    .from(coursesTable)
    .where(and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)))
    .get();

  if (!course) return c.json({}, 404);

  return c.json(course);
});

app.post("/", zValidator("json", createCourseSchema), async (c) => {
  const validated = c.req.valid("json");

  await db.insert(coursesTable).values(validated);

  return c.json({}, 201);
});

app.patch(
  "/:id",
  zValidator("param", getCourseSchema),
  zValidator("json", patchCourseSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const updates = c.req.valid("json");

    if (Object.keys(updates).length === 0)
      return c.json({ error: { message: "No changes provided" } }, 400);

    const updatedCourse = await db
      .update(coursesTable)
      .set(updates)
      .where(and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)))
      .returning();

    return updatedCourse[0] ? c.json(updatedCourse[0], 200) : c.json({}, 404);
  },
);

app.delete("/:id", zValidator("param", getCourseSchema), async (c) => {
  const { id } = c.req.valid("param");

  const deletedCourse = await db
    .update(coursesTable)
    .set({ deletedAt: new Date() })
    .where(and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)))
    .returning();

  return deletedCourse[0] ? c.json({}, 200) : c.json({}, 404);
});

export default app;
