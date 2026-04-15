import { zValidator } from "@hono/zod-validator";
import { and, eq, isNull, sql } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "~server/db";
import {
  coursesTable,
  criteriaTable,
  criterionMarksTable,
} from "~server/db/schema";
import {
  createCriteriaSchema,
  getCriteriaSchema,
  patchCriteriaSchema,
} from "~server/modules/criteria/criteria.schema";

const app = new Hono()
  .get("/:id", zValidator("param", getCriteriaSchema), async (c) => {
    const { id } = c.req.valid("param");

    const courseWithCriteria = await db.query.coursesTable.findFirst({
      where: and(eq(coursesTable.id, id), isNull(coursesTable.deletedAt)),
      columns: {
        title: true,
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

    if (!courseWithCriteria)
      return c.json({ error: { message: "Course not found" } }, 404);

    return c.json(courseWithCriteria);
  })
  .post("/", zValidator("json", createCriteriaSchema), async (c) => {
    const validated = c.req.valid("json");

    await db.transaction(async (tx) => {
      const newCriterion = tx
        .insert(criteriaTable)
        .values({
          title: validated.title,
          courseId: validated.courseId,
        })
        .returning()
        .get();

      const marksToInsert = validated.marks.map((m) => ({
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
      const validated = c.req.valid("json");

      await db.transaction(async (tx) => {
        if (validated.title) {
          await tx
            .update(criteriaTable)
            .set({ title: validated.title })
            .where(eq(criteriaTable.id, id));
        }

        for (const mark of validated.marks) {
          if (mark.id) {
            if (mark.shouldDelete) {
              await tx
                .update(criterionMarksTable)
                .set({ deletedAt: sql`(current_timestamp)` })
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
        .set({ deletedAt: sql`(current_timestamp)` })
        .where(eq(criterionMarksTable.criterionId, id));

      return tx
        .update(criteriaTable)
        .set({ deletedAt: sql`(current_timestamp)` })
        .where(and(eq(criteriaTable.id, id), isNull(criteriaTable.deletedAt)))
        .returning()
        .get();
    });

    return deletedCriterion
      ? c.json({}, 200)
      : c.json({ error: { message: "Criterion not found" } }, 404);
  });

export default app;
