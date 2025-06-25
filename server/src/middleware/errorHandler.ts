import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // Log the error
  logger.error(`${err.name}: ${err.message}`, { 
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Default error values
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorDetails = null;

  // Handle ApiError instances
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    
    // In development, provide the stack trace
    if (process.env.NODE_ENV === 'development') {
      errorDetails = err.stack;
    }
  } 
  // Handle validation errors (e.g., from express-validator)
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } 
  // Handle JWT errors
  else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized: Invalid or expired token';
  }
  // Handle Prisma errors
  else if (err.name === 'PrismaClientKnownRequestError') {
    statusCode = 400;
    message = 'Database operation failed';
    
    // In development, provide more details
    if (process.env.NODE_ENV === 'development') {
      errorDetails = err.message;
    }
  }
  // Handle other errors in development
  else if (process.env.NODE_ENV === 'development') {
    message = err.message;
    errorDetails = err.stack;
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(errorDetails && { details: errorDetails }),
    },
  });
};

/**
 * Function to handle 404 Not Found errors
 */
export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
};