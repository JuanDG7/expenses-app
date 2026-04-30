import { Request, Response, NextFunction } from "express";
import { pool } from "../db";

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    const result = await pool.query(
      `UPDATE expenses
       SET title = $1, amount = $2, category = $3, date = $4, updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [title, amount, category, date, id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({
      ...result.rows[0],
      amount: Number(result.rows[0].amount),
    });
  } catch (err) {
    next(err);
  }
};
