import { createApp } from "app.js";
import { env } from "@config/env.js";
import { logger } from "@config/logger.js";
import { prisma } from "@db/prisma.js";

const app = createApp();

const server = app.listen(env.port, () => {
    logger.info(`Server listening on port ${env.port} [${env.nodeEnv}]`);
});

function shutdown(signal: string): void {
  logger.info(`${signal} received. Shutting down gracefully...`);
  server.close(async (err) => {
    if (err) {
      logger.error({ err }, 'Error during shutdown');
      process.exit(1);
    }
    await prisma.$disconnect();
    logger.info('Server closed. Exiting.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'Unhandled promise rejection');
});