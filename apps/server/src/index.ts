import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "./config";

export const app = new Hono().use(cors()).get("/ported", (c) => {
  return c.json(
    {
      port: config.API_PORT,
    },
    200,
  );
});

Bun.serve({
  port: config.API_PORT,
  fetch: app.fetch,
});

console.log(
  `\n${new Date().toLocaleTimeString("fr-FR", { hour12: false })} - Started development server: http://localhost:${config.API_PORT}\n`,
);
