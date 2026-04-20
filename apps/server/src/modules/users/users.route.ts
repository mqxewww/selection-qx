import { zValidator } from "@hono/zod-validator";
import { and, count, eq, isNull, sql } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "~server/db";
import { usersTable } from "~server/db/schema";
import {
  createUserSchema,
  getUserSchema,
  getUsersListSchema,
  patchUserSchema,
} from "~server/modules/users/users.schema";
import { generateSecureCode } from "~server/utils/generateSecureCode";
import { generateUniqueLogin } from "~server/utils/generateUniqueLogin";

const app = new Hono()
  .get("/", zValidator("query", getUsersListSchema), async (c) => {
    const { page, limit } = c.req.valid("query");

    const [users, metaData] = await Promise.all([
      db.query.usersTable.findMany({
        where: isNull(usersTable.deletedAt),
        columns: {
          id: true,
          firstname: true,
          lastname: true,
          login: true,
          role: true,
          createdAt: true,
        },
        orderBy: usersTable.login,
        offset: (page - 1) * limit,
        limit: limit,
      }),

      db
        .select({ count: count() })
        .from(usersTable)
        .where(isNull(usersTable.deletedAt))
        .get(),
    ]);

    const totalItems = metaData ? metaData.count : 0;

    return c.json({
      items: users,
      meta: {
        totalItems: totalItems,
      },
    });
  })
  .post("/", zValidator("json", createUserSchema), async (c) => {
    const validated = c.req.valid("json");

    const code = generateSecureCode();
    const password = await Bun.password.hash(code);

    const login = await generateUniqueLogin(
      validated.firstname,
      validated.lastname,
      async (login) => {
        return !!db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.login, login),
        });
      },
    );

    await db.insert(usersTable).values({
      firstname: validated.firstname,
      lastname: validated.lastname,
      login,
      password,
      role: validated.role,
    });

    return c.json({ login, code }, 201);
  })
  .put("/:id", zValidator("param", getUserSchema), async (c) => {
    const { id } = c.req.valid("param");

    const code = generateSecureCode();
    const password = await Bun.password.hash(code);

    const updatedUser = db
      .update(usersTable)
      .set({ password: password })
      .where(and(eq(usersTable.id, id), isNull(usersTable.deletedAt)))
      .get();

    return updatedUser
      ? c.json({ code }, 200)
      : c.json({ error: { message: "User not found" } }, 404);
  })
  .patch(
    "/:id",
    zValidator("param", getUserSchema),
    zValidator("json", patchUserSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const updates = c.req.valid("json");

      if (Object.keys(updates).length === 0)
        return c.json({ error: { message: "No changes provided" } }, 400);

      const updatedUser = db
        .update(usersTable)
        .set(updates)
        .where(and(eq(usersTable.id, id), isNull(usersTable.deletedAt)))
        .get();

      return updatedUser
        ? c.json({}, 200)
        : c.json({ error: { message: "User not found" } }, 404);
    },
  )
  .delete("/:id", zValidator("param", getUserSchema), async (c) => {
    const { id } = c.req.valid("param");

    const deletedUser = db
      .update(usersTable)
      .set({ deletedAt: sql`(current_timestamp)` })
      .where(and(eq(usersTable.id, id), isNull(usersTable.deletedAt)))
      .returning()
      .get();

    return deletedUser
      ? c.json({}, 200)
      : c.json({ error: { message: "User not found" } }, 404);
  });

export default app;
