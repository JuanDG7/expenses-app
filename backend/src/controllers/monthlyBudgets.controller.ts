import type { Response, Request, NextFunction } from "express";
import { pool } from "../db";

export const getMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { month } = req.params;

    const result = await pool.query(
      `SELECT * FROM monthly_budgets WHERE month = $1`,
      [month]
    );

    if (!result.rows[0]) {
      return res.json(null);
    }

    res.json({
      ...result.rows[0],
      amount: Number(result.rows[0].amount),
    });
  } catch (err) {
    next(err);
  }
};
