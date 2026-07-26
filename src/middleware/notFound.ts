import type { Request, Response } from "express";
import { sendError } from "../shared/utils/apiResponse.js";

export function notFoundHandler (
    req: Request,
    res: Response
): void {
    sendError(
        res,
        404,
        `Route ${req.method} ${req.originalUrl} not found`,
        "ROUTE_NOT_FOUND"
    );
}