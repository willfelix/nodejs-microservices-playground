import axios from "axios";
import { NextFunction, Request, Response } from "express";

export async function getRegistry(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const url = process.env.SERVICE_REGISTRY_URL;
    const { data } = await axios.get(`${url}/service${request.url}`);
    (request as any)["service"] = data;

    return next();
  } catch (e: any) {
    response.statusCode = 404;
    response.json({ error: "Service not found!", message: e.message });
  }
}
