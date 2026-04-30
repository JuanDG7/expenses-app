import { Request, Response, NextFunction } from "express";
import { pool } from "../db";

export const getExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await pool.query("SELECT * FROM expenses");
    res.json(
      result.rows.map((row) => ({ ...row, amount: Number(row.amount) }))
    );
  } catch (err) {
    next(err);
  }
};

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, amount, category, date } = req.body;

    const result = await pool.query(
      `INSERT INTO expenses (title, amount, category, date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, amount, category, date]
    );

    res.status(201).json({
      ...result.rows[0],
      amount: Number(result.rows[0].amount),
    });
  } catch (err) {
    next(err);
  }
};

export const getExpenseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM expenses WHERE id = $1", [
      id,
    ]);

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

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *",
      [id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });
  } catch (err) {
    next(err);
  }
};
