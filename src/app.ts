import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "@config/env.js";
import { requestLogger } from "@middleware/requestLogger.js";
import { notFoundHandler } from "@middleware/notFound.js";
import { errorHandler } from "@middleware/errorHandler.js";
import { sendSuccess } from "@shared/utils/apiResponse.js";

export function createApp(): Application {
    const app = express();
    // app.use(helmet());
    app.use(cors({ origin: env.corsOrigin}))

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));

    app.use(requestLogger);

    app.get("/health", (_req, res) => {
        sendSuccess(res, { status: "ok", timeStamp: new Date().toISOString() });
    })

    app.use(notFoundHandler);

    app.use(errorHandler);

    return app;
}