import { NextApiRequest, NextApiResponse } from 'next';
import { LucideIcon } from 'lucide-react';

/**
 * Custom error type for application-specific errors.
 */
export type AppError = {
  message: string;
  statusCode: number;
  icon?: LucideIcon;
};

/**
 * Handles errors by sending a structured response.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @param {AppError} error - The error object containing message and status code.
 */
export function handleError(res: NextApiResponse, error: AppError): void {
  res.status(error.statusCode).json({
    error: {
      message: error.message,
      icon: error.icon ? error.icon.name : undefined,
    },
  });
}

/**
 * Creates a new AppError instance.
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code.
 * @param {LucideIcon} [icon] - Optional icon to represent the error.
 * @returns {AppError} - The constructed AppError object.
 */
export function createAppError(message: string, statusCode: number, icon?: LucideIcon): AppError {
  return { message, statusCode, icon };
}

/**
 * Middleware to catch and handle errors in API routes.
 * @param {Function} handler - The API route handler function.
 * @returns {Function} - A wrapped handler with error handling.
 */
export function withErrorHandling(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      const appError = createAppError(
        error.message || 'Internal Server Error',
        error.statusCode || 500
      );
      handleError(res, appError);
    }
  };
}

export { handleError, createAppError, withErrorHandling };