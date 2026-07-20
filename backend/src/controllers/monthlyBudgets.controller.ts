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
export const createMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, month } = req.body;

    const result = await pool.query(
      `
        INSERT INTO monthly_budgets (amount,month)
        VALUES ($1,$2) RETURNING *`,
      [amount, month]
    );

    res.status(201).json({
      ...result.rows[0],
      amount: Number(result.rows[0].amount),
    });
  } catch (err) {
    next(err);
  }
};

export const updateMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { month } = req.params;
    const { amount } = req.body;

    const result = await pool.query(
      `
      UPDATE monthly_budgets
      SET amount=$1, updated_at=NOW()
      WHERE month=$2 RETURNING *`,
      [amount, month]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Monthly budget not found",
      });
    }

    res.json({
      ...result.rows[0],
      amount: Number(result.rows[0].amount),
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { month } = req.params;

    const result = await pool.query(
      `DELETE FROM monthly_budgets
       WHERE month = $1
       RETURNING *`,
      [month]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Monthly budget not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
