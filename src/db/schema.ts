import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const surveyResponses = pgTable("survey_responses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  /** Regelmäßige berufliche Nutzung digitaler PM-/Arbeitssoftware (mind. mehrmals pro Woche). */
  s1: boolean("s1").notNull(),
  /** Beruflich an Konzeption, Gestaltung oder Entwicklung von PM-Software beteiligt. */
  s2: boolean("s2").notNull(),
  /** Teilnahmekriterium: s1 = true und s2 = false. */
  eligible: boolean("eligible").notNull(),
  treatmentGroup: integer("treatment_group"),
  visawi1: integer("visawi_1"),
  visawi2: integer("visawi_2"),
  visawi3: integer("visawi_3"),
  visawi4: integer("visawi_4"),
  aufwand1: integer("aufwand_1"),
  aufwand2: integer("aufwand_2"),
  aufwand3: integer("aufwand_3"),
  comp1: integer("comp_1"),
  comp2: integer("comp_2"),
  comp3: integer("comp_3"),
  comp4: integer("comp_4"),
  trust1: integer("trust_1"),
  trust2: integer("trust_2"),
  trust3: integer("trust_3"),
  trust4: integer("trust_4"),
  intent1: integer("intent_1"),
  intent2: integer("intent_2"),
  intent3: integer("intent_3"),
  intent4: integer("intent_4"),
  /** Rohwert 1–7; korrekt ist 5 („stimme eher zu“). Zählt nicht zur Skala. */
  attentionCheck: integer("attention_check"),
  age: integer("age"),
  gender: varchar("gender", { length: 50 }),
  educationLevel: varchar("education_level", { length: 100 }),
});
