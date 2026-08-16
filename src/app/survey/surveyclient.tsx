"use client";

import { useEffect, useState, type FormEvent } from "react";
import { saveScreeningOut, saveSurveyResponse } from "@/src/actions/antworten";
import {
  LIKERT_LABELS,
  LIKERT_VALUES,
  educationOptions,
  genderOptions,
  isEligible,
  questionBlocks,
  screeningQuestions,
  treatments,
  type LikertId,
  type TreatmentGroup,
} from "./assets";

const LIKERT_IDS = questionBlocks.flatMap((block) => block.items.map((item) => item.id));

type Step =
  | "consent"
  | "screening"
  | "loading"
  | "brand"
  | "stimulus"
  | "questions"
  | "demographics"
  | "done"
  | "screenedOut";

const emptyAnswers = {} as Partial<Record<LikertId, number>>;

function pickGroup(): TreatmentGroup {
  return (Math.floor(Math.random() * 4) + 1) as TreatmentGroup;
}

function preloadImages(urls: readonly string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = src;
        }),
    ),
  ).then(() => undefined);
}

function YesNoRow({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-base font-medium text-black">{label}</legend>
      <div className="flex gap-6">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name={id}
            checked={value === true}
            onChange={() => onChange(true)}
            className="h-4 w-4 accent-black"
            required
          />
          <span>Ja</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name={id}
            checked={value === false}
            onChange={() => onChange(false)}
            className="h-4 w-4 accent-black"
            required
          />
          <span>Nein</span>
        </label>
      </div>
    </fieldset>
  );
}

function LikertRow({
  id,
  label,
  value,
  onChange,
}: {
  id: LikertId;
  label: string;
  value: number | undefined;
  onChange: (id: LikertId, value: number) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-base font-medium text-black">{label}</legend>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-neutral-600 sm:w-36">stimme gar nicht zu</span>
        <div className="flex justify-between gap-2 sm:justify-center sm:gap-4">
          {LIKERT_VALUES.map((n) => (
            <label key={n} className="flex cursor-pointer flex-col items-center gap-1">
              <input
                type="radio"
                name={id}
                value={n}
                checked={value === n}
                onChange={() => onChange(id, n)}
                className="h-4 w-4 accent-black"
                aria-label={LIKERT_LABELS[n]}
                required
              />
              <span className="text-sm">{n}</span>
            </label>
          ))}
        </div>
        <span className="text-xs text-neutral-600 sm:w-36 sm:text-right">stimme voll zu</span>
      </div>
    </fieldset>
  );
}

export default function SurveyClient() {
  const [step, setStep] = useState<Step>("consent");
  const [group, setGroup] = useState<TreatmentGroup | null>(null);
  const [s1, setS1] = useState<boolean | undefined>(undefined);
  const [s2, setS2] = useState<boolean | undefined>(undefined);
  const [frameIndex, setFrameIndex] = useState(0);
  const [answers, setAnswers] = useState(emptyAnswers);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const allLikertAnswered = LIKERT_IDS.every((id) => answers[id] !== undefined);

  useEffect(() => {
    if (step !== "loading" || group === null) {
      return;
    }

    let cancelled = false;
    preloadImages(treatments[group].images).then(() => {
      if (!cancelled) {
        setFrameIndex(0);
        setStep("brand");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [step, group]);

  const startScreening = () => {
    setStep("screening");
  };

  const submitScreening = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (s1 === undefined || s2 === undefined) {
      setError("Bitte beantworten Sie beide Fragen.");
      return;
    }

    if (!isEligible(s1, s2)) {
      setSubmitting(true);
      const result = await saveScreeningOut({ s1, s2 });
      setSubmitting(false);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setStep("screenedOut");
      return;
    }

    setGroup(pickGroup());
    setFrameIndex(0);
    setStep("loading");
  };

  const restart = () => {
    setStep("consent");
    setGroup(null);
    setS1(undefined);
    setS2(undefined);
    setFrameIndex(0);
    setAnswers(emptyAnswers);
    setAge("");
    setGender("");
    setEducationLevel("");
    setError(null);
    setSubmitting(false);
  };

  const handleSelect = (id: LikertId, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const goToDemographics = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!allLikertAnswered) {
      setError("Bitte beantworten Sie alle Fragen.");
      return;
    }
    setStep("demographics");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (group === null || s1 === undefined || s2 === undefined || !allLikertAnswered) {
      setError("Bitte beantworten Sie alle Fragen.");
      return;
    }

    const parsedAge = Number.parseInt(age, 10);
    if (!Number.isInteger(parsedAge) || parsedAge < 16 || parsedAge > 99) {
      setError("Bitte geben Sie ein gültiges Alter an.");
      return;
    }
    if (!gender || !educationLevel) {
      setError("Bitte füllen Sie alle demografischen Angaben aus.");
      return;
    }

    setSubmitting(true);
    const result = await saveSurveyResponse({
      s1,
      s2,
      treatmentGroup: group,
      visawi1: answers.visawi1!,
      visawi2: answers.visawi2!,
      visawi3: answers.visawi3!,
      visawi4: answers.visawi4!,
      aufwand1: answers.aufwand1!,
      aufwand2: answers.aufwand2!,
      aufwand3: answers.aufwand3!,
      comp1: answers.comp1!,
      comp2: answers.comp2!,
      comp3: answers.comp3!,
      comp4: answers.comp4!,
      trust1: answers.trust1!,
      trust2: answers.trust2!,
      trust3: answers.trust3!,
      trust4: answers.trust4!,
      intent1: answers.intent1!,
      intent2: answers.intent2!,
      intent3: answers.intent3!,
      intent4: answers.intent4!,
      attentionCheck: answers.attentionCheck!,
      mc1: answers.mc1!,
      mc2: answers.mc2!,
      age: parsedAge,
      gender,
      educationLevel,
    });
    setSubmitting(false);

    if (result.success) {
      setStep("done");
    } else {
      setError(result.error);
    }
  };

  if (step === "consent") {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Studie zur Wahrnehmung digitaler Oberflächen</h1>
        <p className="mt-6 leading-relaxed text-neutral-800">
          In dieser kurzen Umfrage beantworten Sie zunächst zwei Fragen zu Ihrer beruflichen
          Nutzung von Projektmanagement-Software. Anschließend lesen Sie eine kurze Beschreibung
          eines Tools und sehen nacheinander drei Ausschnitte der Oberfläche. Danach folgen
          einige Fragen zu Ihrem Eindruck.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-800">
          Die Teilnahme ist freiwillig, anonym und dauert etwa fünf Minuten. Es werden keine
          personenbezogenen Daten außer Alter, Geschlecht und Bildungsabschluss gespeichert. Sie
          können die Umfrage jederzeit abbrechen.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-800">
          Mit Klick auf „Teilnehmen“ erklären Sie sich mit der Teilnahme einverstanden.
        </p>
        <button
          type="button"
          onClick={startScreening}
          className="mt-10 w-full rounded-[12px] bg-black px-6 py-3 text-white"
        >
          Teilnehmen
        </button>
      </main>
    );
  }

  if (step === "screening") {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center px-6 py-16">
        <form onSubmit={submitScreening} className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">Teilnahmevoraussetzungen</h2>
            <p className="leading-relaxed text-neutral-800">
              Bitte beantworten Sie zunächst zwei kurze Fragen zu Ihrer beruflichen Tätigkeit.
            </p>
          </div>

          {screeningQuestions.map((question) => (
            <YesNoRow
              key={question.id}
              id={question.id}
              label={question.label}
              value={question.id === "s1" ? s1 : s2}
              onChange={question.id === "s1" ? setS1 : setS2}
            />
          ))}

          {error && <p className="text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-[12px] bg-black px-6 py-3 text-white disabled:opacity-50"
          >
            {submitting ? "Wird gespeichert …" : "Weiter"}
          </button>
        </form>
      </main>
    );
  }

  if (step === "screenedOut") {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Vielen Dank</h2>
        <p className="mt-4 text-neutral-700">
          Für diese Studie werden ausschließlich regelmäßig Nutzende von Arbeits- oder
          Projektmanagement-Software gesucht, die nicht selbst an der Konzeption, Gestaltung
          oder Entwicklung solcher Software beteiligt sind. Ihre Angaben wurden gespeichert.
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-10 rounded-[12px] bg-black px-6 py-3 text-white"
        >
          Zurück zum Start
        </button>
      </main>
    );
  }

  if (step === "loading") {
    return (
      <main className="flex min-h-full flex-col items-center justify-center px-6">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-black"
          aria-hidden="true"
        />
        <p className="mt-4 text-sm text-neutral-600">Wird geladen …</p>
      </main>
    );
  }

  if (step === "brand" && group !== null) {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center px-6 py-16">
        <p className="text-lg leading-relaxed text-neutral-800">
          {treatments[group].brandStatement}
        </p>
        <button
          type="button"
          onClick={() => setStep("stimulus")}
          className="mt-10 w-full rounded-[12px] bg-black px-6 py-3 text-white"
        >
          Weiter
        </button>
      </main>
    );
  }

  if (step === "stimulus" && group !== null) {
    const frames = treatments[group].images;
    const isFirst = frameIndex === 0;
    const isLast = frameIndex === frames.length - 1;

    return (
      <main className="flex min-h-full flex-col items-center justify-center gap-6 bg-white px-4 py-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frames[frameIndex]}
          alt=""
          className="h-auto max-h-[80vh] w-full max-w-[390px] object-contain"
        />
        <div className="flex w-full max-w-[390px] gap-3">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => setFrameIndex((i) => i - 1)}
            className="flex-1 rounded-[12px] border border-neutral-300 px-4 py-3 disabled:opacity-40"
          >
            Zurück
          </button>
          <button
            type="button"
            onClick={() =>
              isLast ? setStep("questions") : setFrameIndex((i) => i + 1)
            }
            className="flex-1 rounded-[12px] bg-black px-4 py-3 text-white"
          >
            {isLast ? "Zur Umfrage" : "Weiter"}
          </button>
        </div>
      </main>
    );
  }

  if (step === "questions") {
    return (
      <main className="mx-auto w-full max-w-2xl px-6 py-12">
        <form onSubmit={goToDemographics} className="space-y-12">
          <h2 className="text-2xl font-semibold tracking-tight">Ihre Einschätzung</h2>
          <p className="text-sm text-neutral-600">
            Bitte geben Sie an, inwieweit Sie den Aussagen zustimmen.
          </p>
          <ul className="grid grid-cols-1 gap-1 text-sm text-neutral-600 sm:grid-cols-2">
            {LIKERT_VALUES.map((n) => (
              <li key={n}>
                {n} = {LIKERT_LABELS[n]}
              </li>
            ))}
          </ul>

          {questionBlocks.map((block) => (
            <section key={block.title} className="space-y-8">
              <h3 className="text-lg font-semibold">{block.title}</h3>
              {block.items.map((item) => (
                <LikertRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  value={answers[item.id]}
                  onChange={handleSelect}
                />
              ))}
            </section>
          ))}

          {error && <p className="text-red-700">{error}</p>}

          <button type="submit" className="w-full rounded-[12px] bg-black px-6 py-3 text-white">
            Weiter
          </button>
        </form>
      </main>
    );
  }

  if (step === "demographics") {
    return (
      <main className="mx-auto w-full max-w-xl px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Angaben zu Ihrer Person</h2>

          <label className="block space-y-2">
            <span className="font-medium">Alter</span>
            <input
              type="number"
              min={16}
              max={99}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-neutral-300 px-3 py-2"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="font-medium">Geschlecht</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-neutral-300 bg-white px-3 py-2"
              required
            >
              <option value="">Bitte wählen</option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="font-medium">Höchster Bildungsabschluss</span>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full border border-neutral-300 bg-white px-3 py-2"
              required
            >
              <option value="">Bitte wählen</option>
              {educationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {error && <p className="text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-[12px] bg-black px-6 py-3 text-white disabled:opacity-50"
          >
            {submitting ? "Wird gespeichert …" : "Absenden"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">Vielen Dank</h2>
      <p className="mt-4 text-neutral-700">Ihre Antworten wurden gespeichert.</p>
      <button
        type="button"
        onClick={restart}
        className="mt-10 rounded-[12px] bg-black px-6 py-3 text-white"
      >
        Umfrage erneut starten
      </button>
    </main>
  );
}
