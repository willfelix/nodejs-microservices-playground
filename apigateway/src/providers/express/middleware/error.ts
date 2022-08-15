import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export async function errorHandler(
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    message: "Ocorreu um erro com a aplicação",
    logMessage: error.toString(),
  });
}
