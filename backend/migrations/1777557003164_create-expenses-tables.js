/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql(`
    CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50)  NOT NULL,
  amount decimal(10,2) NOT NULL CHECK(amount>0),
  category VARCHAR(50) NOT NULL,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
)`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
  DROP TABLE IF EXISTS expenses;
  `);
};
