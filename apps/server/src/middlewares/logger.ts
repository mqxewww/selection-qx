import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
        colorize: false,
      },
    },
  }),
});
