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
    ALTER TABLE expenses
    ALTER COLUMN amount DROP NOT null;

    ALTER TABLE expenses
    ALTER COLUMN category DROP NOT null;

    ALTER TABLE expenses
    ADD COLUMN contexts TEXT[] DEFAULT '{}';
    
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
    ALTER TABLE expenses
    ALTER COLUMN amount SET NOT NULL;

    ALTER TABLE expenses
    ALTER COLUMN category SET NOT NULL;

    ALTER TABLE expenses
    DROP COLUMN contexts;
    `);
};
