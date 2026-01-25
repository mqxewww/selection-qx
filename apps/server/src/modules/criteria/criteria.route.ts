import { zValidator } from "@hono/zod-validator";
import { and, eq, isNull } from "drizzle-orm";
import { Hono } from "hono";
import { coursesTable, criteriaTable, criterionMarksTable, db } from "~/db";
import {
  createCriteriaSchema,
  getCriteriaSchema,
  patchCriteriaSchema,
} from "~/modules/criteria/criteria.schema";

const app = new Hono()
  .post("/", zValidator("json", createCriteriaSchema), async (c) => {
    const { title, courseId, marks } = c.req.valid("json");

    const course = (
      await db
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(
          and(eq(coursesTable.id, courseId), isNull(coursesTable.deletedAt)),
        )
    )[0];

    if (!course) return c.json({ error: { message: "Course not found" } }, 404);

    await db.transaction(async (tx) => {
      const newCriterion = (
        await tx
          .insert(criteriaTable)
          .values({
            title,
            courseId,
          })
          .returning()
      )[0];

      const marksToInsert = marks.map((m) => ({
        label: m.label,
        mark: m.mark,
        criterionId: newCriterion.id,
      }));

      await tx.insert(criterionMarksTable).values(marksToInsert);
    });

    return c.json({}, 201);
  })
  .patch(
    "/:id",
    zValidator("param", getCriteriaSchema),
    zValidator("json", patchCriteriaSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const { title, marks } = c.req.valid("json");

      const criterion = (
        await db
          .select()
          .from(criteriaTable)
          .where(and(eq(criteriaTable.id, id), isNull(criteriaTable.deletedAt)))
      )[0];

      if (!criterion)
        return c.json({ error: { message: "Criterion not found" } }, 404);

      await db.transaction(async (tx) => {
        if (title) {
          await tx
            .update(criteriaTable)
            .set({ title })
            .where(eq(criteriaTable.id, id));
        }

        for (const mark of marks) {
          if (mark.id) {
            if (mark.shouldDelete) {
              await tx
                .update(criterionMarksTable)
                .set({ deletedAt: new Date() })
                .where(eq(criterionMarksTable.id, mark.id));

              continue;
            }

            await tx
              .update(criterionMarksTable)
              .set({
                label: mark.label,
                mark: mark.mark,
              })
              .where(
                and(
                  eq(criterionMarksTable.id, mark.id),
                  isNull(criterionMarksTable.deletedAt),
                ),
              );

            continue;
          }

          if (!mark.shouldDelete) {
            await tx.insert(criterionMarksTable).values({
              label: mark.label,
              mark: mark.mark,
              criterionId: id,
            });
          }
        }
      });

      return c.json({}, 200);
    },
  )
  .delete("/:id", zValidator("param", getCriteriaSchema), async (c) => {
    const { id } = c.req.valid("param");

    const deletedCriterion = await db.transaction(async (tx) => {
      await tx
        .update(criterionMarksTable)
        .set({ deletedAt: new Date() })
        .where(eq(criterionMarksTable.criterionId, id));

      return (
        await tx
          .update(criteriaTable)
          .set({ deletedAt: new Date() })
          .where(and(eq(criteriaTable.id, id), isNull(criteriaTable.deletedAt)))
          .returning()
      )[0];
    });

    return deletedCriterion
      ? c.json({}, 200)
      : c.json({ error: { message: "Criterion not found" } }, 404);
  });

export default app;
