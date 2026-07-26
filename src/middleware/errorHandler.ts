import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/utils/AppError.js";
import { sendError } from "../shared/utils/apiResponse.js";
import { logger } from "../config/logger.js";

export function errorHandler(
    err: unknown, _req: Request, res: Response, _next: NextFunction
): void{
    if( err instanceof AppError){
        logger.warn(err.message);

        sendError(
            res,
            err.statusCode,
            err.message,
            "APP_ERROR",
            err.details
        );
        return;
    }

    logger.error(err);

    sendError(
        res,
        500,
        "internal server error",
        "INTERNAL_SERVER_ERROR"
    );
}

export function asyncHandler(
    fn: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<unknown>
){
    return ( req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}
