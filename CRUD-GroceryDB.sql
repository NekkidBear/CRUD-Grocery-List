-- These two lines make it so that every single SQL query in
-- this file can be ran all at once to "reset" the database:
DROP TABLE IF EXISTS "groceries";

-- Table Schema Template:
CREATE TABLE "groceries" (
  "id" SERIAL PRIMARY KEY,
  "item" VARCHAR(500) NOT NULL,
  "quantity" INTEGER,
  "unit_price" MONEY,
  "in_cart" BOOLEAN DEFAULT FALSE
);

-- Seed Data Template:
INSERT INTO "groceries"
  ("item", "quantity", "unit_price", "in_cart")
  VALUES
  ("milk", 2, 3.39, TRUE),
  ("bread", 1, 4.59, TRUE),
  ("eggs", 1, 2.00, TRUE),
  ("cheese", 1, 3.00, TRUE)