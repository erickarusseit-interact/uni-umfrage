"use server";

import { getDb } from "@/src/db/drizzle";
import { surveyResponses } from "@/src/db/schema";
import { isEligible } from "@/src/app/survey/assets";

export type ScreeningPayload = {
  s1: boolean;
  s2: boolean;
};

export type SurveyPayload = ScreeningPayload & {
  treatmentGroup: number;
  visawi1: number;
  visawi2: number;
  visawi3: number;
  visawi4: number;
  aufwand1: number;
  aufwand2: number;
  aufwand3: number;
  comp1: number;
  comp2: number;
  comp3: number;
  comp4: number;
  trust1: number;
  trust2: number;
  trust3: number;
  trust4: number;
  intent1: number;
  intent2: number;
  intent3: number;
  intent4: number;
  age: number;
  gender: string;
  educationLevel: string;
};

const LIKERT_KEYS = [
  "visawi1",
  "visawi2",
  "visawi3",
  "visawi4",
  "aufwand1",
  "aufwand2",
  "aufwand3",
  "comp1",
  "comp2",
  "comp3",
  "comp4",
  "trust1",
  "trust2",
  "trust3",
  "trust4",
  "intent1",
  "intent2",
  "intent3",
  "intent4",
] as const;

function isLikert(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 7;
}

function isYesNo(value: unknown): value is boolean {
  return value === true || value === false;
}

export async function saveScreeningOut(
  data: ScreeningPayload,
): Promise<{ success: true } | { success: false; error: string }> {
  if (!isYesNo(data.s1) || !isYesNo(data.s2)) {
    return { success: false, error: "Bitte beantworten Sie beide Screening-Fragen." };
  }

  if (isEligible(data.s1, data.s2)) {
    return { success: false, error: "Ungültige Screening-Angaben." };
  }

  await getDb().insert(surveyResponses).values({
    s1: data.s1,
    s2: data.s2,
    eligible: false,
  });

  return { success: true };
}

export async function saveSurveyResponse(
  data: SurveyPayload,
): Promise<{ success: true } | { success: false; error: string }> {
  if (!isYesNo(data.s1) || !isYesNo(data.s2) || !isEligible(data.s1, data.s2)) {
    return { success: false, error: "Ungültige Screening-Angaben." };
  }

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
      return { success: false, error: "Bitte beantworten Sie alle Skalenfragen (1–7)." };
    }
  }

  if (
    typeof data.age !== "number" ||
    !Number.isInteger(data.age) ||
    data.age < 16 ||
    data.age > 99
  ) {
    return { success: false, error: "Bitte geben Sie ein gültiges Alter an." };
  }

  if (!data.gender?.trim() || !data.educationLevel?.trim()) {
    return { success: false, error: "Bitte füllen Sie alle demografischen Angaben aus." };
  }

  await getDb().insert(surveyResponses).values({
    s1: data.s1,
    s2: data.s2,
    eligible: true,
    treatmentGroup: data.treatmentGroup,
    visawi1: data.visawi1,
    visawi2: data.visawi2,
    visawi3: data.visawi3,
    visawi4: data.visawi4,
    aufwand1: data.aufwand1,
    aufwand2: data.aufwand2,
    aufwand3: data.aufwand3,
    comp1: data.comp1,
    comp2: data.comp2,
    comp3: data.comp3,
    comp4: data.comp4,
    trust1: data.trust1,
    trust2: data.trust2,
    trust3: data.trust3,
    trust4: data.trust4,
    intent1: data.intent1,
    intent2: data.intent2,
    intent3: data.intent3,
    intent4: data.intent4,
    age: data.age,
    gender: data.gender.trim(),
    educationLevel: data.educationLevel.trim(),
  });

  return { success: true };
}
