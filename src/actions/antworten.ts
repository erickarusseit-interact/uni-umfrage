"use server";

import { getDb } from "@/src/db/drizzle";
import { surveyResponses } from "@/src/db/schema";

export type SurveyPayload = {
  treatmentGroup: number;
  visawi1: number;
  visawi2: number;
  visawi3: number;
  visawi4: number;
  comp1: number;
  comp2: number;
  comp3: number;
  trust1: number;
  trust2: number;
  trust3: number;
  mc1: number;
  mc2: number;
  age: number;
  gender: string;
  educationLevel: string;
};

const LIKERT_KEYS = [
  "visawi1",
  "visawi2",
  "visawi3",
  "visawi4",
  "comp1",
  "comp2",
  "comp3",
  "trust1",
  "trust2",
  "trust3",
  "mc1",
  "mc2",
] as const;

function isLikert(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 7;
}

export async function saveSurveyResponse(
  data: SurveyPayload,
): Promise<{ success: true } | { success: false; error: string }> {
  if (
    typeof data.treatmentGroup !== "number" ||
    !Number.isInteger(data.treatmentGroup) ||
    data.treatmentGroup < 1 ||
    data.treatmentGroup > 4
  ) {
    return { success: false, error: "Ungültige Versuchsgruppe." };
  }

  for (const key of LIKERT_KEYS) {
    if (!isLikert(data[key])) {
      return { success: false, error: "Bitte beantworte alle Skalenfragen (1–7)." };
    }
  }

  if (
    typeof data.age !== "number" ||
    !Number.isInteger(data.age) ||
    data.age < 16 ||
    data.age > 99
  ) {
    return { success: false, error: "Bitte gib ein gültiges Alter an." };
  }

  if (!data.gender?.trim() || !data.educationLevel?.trim()) {
    return { success: false, error: "Bitte fülle alle demografischen Angaben aus." };
  }

  await getDb().insert(surveyResponses).values({
    treatmentGroup: data.treatmentGroup,
    visawi1: data.visawi1,
    visawi2: data.visawi2,
    visawi3: data.visawi3,
    visawi4: data.visawi4,
    comp1: data.comp1,
    comp2: data.comp2,
    comp3: data.comp3,
    trust1: data.trust1,
    trust2: data.trust2,
    trust3: data.trust3,
    mc1: data.mc1,
    mc2: data.mc2,
    age: data.age,
    gender: data.gender.trim(),
    educationLevel: data.educationLevel.trim(),
  });

  return { success: true };
}
