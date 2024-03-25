import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

class CustomError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status ?? 500;
    this.name = this.constructor.name;
  }

  toJSON() {
    return {
      error: {
        status: this.status,
        message: this.message
      }
    };
  }
}

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message ?? 'Not Found', 404);
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message ?? 'Bad Request', 400);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message ?? 'Unauthorized', 401);
  }
}

class ConflictError extends CustomError {
  constructor(message: string) {
    super(message ?? 'Conflict', 409);
  }
}

class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message ?? 'Internal Server Error', 500);
  }
}

function errorHandler(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.status).json(err.toJSON());
  }

  console.error(err);
  res.status(500).json({
    error: {
      status: 500,
      message: 'Internal Server Error'
    }
  });
}

export {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  InternalServerError,
  errorHandler
};
