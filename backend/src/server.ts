import app from "./app";
import "dotenv/config";
const PORT = process.env.PORT || 8080;

import { pool } from "./db";

pool
  .query(`SELECT NOW()`)
  .then(() => {
    console.log("Connected to PostgreSQL");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error", err);
  });
