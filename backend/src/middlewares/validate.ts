// src/middlewares/validate.ts
import { Request, Response, NextFunction } from "express";

// prettier-ignore
export const validate =  (schema: any, source: "body" | "params" = "body") => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    return res.status(422).json({
      message: "Error de validacion",
      data: result.error.issues
    });
  }

  // req.body = result.data; 
  // req[source]=result.data
  (req as any)[source] = result.data;
  next();
};
