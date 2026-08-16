import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const surveyResponses = pgTable("survey_responses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  treatmentGroup: integer("treatment_group").notNull(),
  visawi1: integer("visawi_1").notNull(),
  visawi2: integer("visawi_2").notNull(),
  visawi3: integer("visawi_3").notNull(),
  visawi4: integer("visawi_4").notNull(),
  comp1: integer("comp_1").notNull(),
  comp2: integer("comp_2").notNull(),
  comp3: integer("comp_3").notNull(),
  trust1: integer("trust_1").notNull(),
  trust2: integer("trust_2").notNull(),
  trust3: integer("trust_3").notNull(),
  mc1: integer("mc_1").notNull(),
  mc2: integer("mc_2").notNull(),
  age: integer("age").notNull(),
  gender: varchar("gender", { length: 50 }).notNull(),
  educationLevel: varchar("education_level", { length: 100 }).notNull(),
});
