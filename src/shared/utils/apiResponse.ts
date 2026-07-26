import type { Response } from "express";

interface SuccessBody<T> {
    success: true;
    data: T
    meta?: Record<string, unknown>
}

interface ErrorBody {
    success: false;
    error: {
        message: string;
        code: string;
        details?: unknown;
    }
}

export function sendSuccess<T> (
    res: Response,
    data: T,
    statusCode = 200,
    meta?: Record<string, unknown>,
): Response<SuccessBody<T>> {
    return res.status(statusCode)
              .json({
                success: true,
                data,
                ...(meta ? {meta} : {} )
              });
}

export function sendError(
    res: Response,
    statusCode: number,
    message: string,
    code: string,
    details?: unknown,
): Response<ErrorBody> {
    return res.status(statusCode)
               .json({
                success: false,
                error: {
                    message,
                    code,
                    ...(details ? {details} : {})
                }  
               });
}