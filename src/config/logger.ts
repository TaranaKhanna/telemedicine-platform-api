import pino from "pino";
import { env } from "./env.js";

export const logger = pino({
  level: env.logLevel,
  ...(env.nodeEnv === "development" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
});