import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger as honoLogger } from "hono/logger";
import { config } from "~server/config";
import { logger } from "~server/middlewares/logger";
import coursesRoute from "~server/modules/courses/courses.route";
import criteriaRoute from "~server/modules/criteria/criteria.route";
import serverPackage from "../package.json";

const app = new Hono()
  .use(cors())
  .use(
    honoLogger((message: string, ...rest: string[]) =>
      logger.info(`[HTTP] ${message + rest}`),
    ),
  )
  .use("/uploads/*", serveStatic({ root: "./public" }))
  .route("/courses", coursesRoute)
  .route("/criteria", criteriaRoute);

export type AppType = typeof app;

const server = Bun.serve({
  hostname: config.API_HOST,
  port: config.API_PORT,
  fetch: app.fetch,
});

logger.info(
  `Server hosted on: ${server.url}. version=${serverPackage.version} dev=${server.development}`,
);
