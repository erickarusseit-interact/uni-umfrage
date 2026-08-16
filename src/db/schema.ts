import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const useres = pgTable("users", {
  id: integer("id").primaryKey(),
  age: integer("age").notNull(),
  experience: boolean("done").default(false).notNull(),
  experienceConstructing: boolean("none").default(false).notNull(),
});


export const antworten = pgTable("antworten", {
  id: integer("id").primaryKey(),
  antworten: integer("antworten").notNull(),
});
