import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "~/config";
import coursesRoute from "~/modules/courses/courses.route";
import criteriaRoute from "~/modules/criteria/criteria.route";

const app = new Hono()
  .use(cors())
  .get("/port", (c) => {
    return c.json({ port: 2900 }, 200);
  })
  .route("/courses", coursesRoute)
  .route("/criteria", criteriaRoute);

Bun.serve({
  port: config.API_PORT,
  fetch: app.fetch,
});

console.log(
  `\n${new Date().toLocaleTimeString("fr-FR", { hour12: false })} - Started development server: http://localhost:${config.API_PORT}\n`,
);

export type AppType = typeof app;
