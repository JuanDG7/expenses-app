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
    const { title, amount, category } = req.body;

    const result = await pool.query(
      `INSERT INTO expenses (title, amount, category)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, amount, category]
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

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const result = await pool.query(
      `UPDATE expenses
       SET ${setClause}, updated_at = NOW()
       WHERE id = $${fields.length + 1}
       RETURNING *`,
      [...values, id]
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
