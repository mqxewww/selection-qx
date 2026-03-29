import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { config } from "~server/config";
import coursesRoute from "~server/modules/courses/courses.route";
import criteriaRoute from "~server/modules/criteria/criteria.route";
import serverPackage from "../package.json";

const app = new Hono()
  .use(cors())
  .use("/uploads/*", serveStatic({ root: "./public" }))
  .route("/courses", coursesRoute)
  .route("/criteria", criteriaRoute);

export type AppType = typeof app;

const server = Bun.serve({
  port: config.API_PORT,
  fetch: app.fetch,
});

console.log(
  `\n${new Date().toLocaleTimeString("fr-FR", { hour12: false })} - Server hosted on: ${server.url}. version=${serverPackage.version} dev=${server.development}\n`,
);
