"use client";

import { useEffect, useState, type FormEvent } from "react";
import { saveSurveyResponse } from "@/src/actions/antworten";
import {
  EXPOSURE_MS,
  LIKERT_VALUES,
  educationOptions,
  genderOptions,
  questionBlocks,
  treatments,
  type LikertId,
  type TreatmentGroup,
} from "./assets";

const LIKERT_IDS = questionBlocks.flatMap((block) => block.items.map((item) => item.id));

type Step = "consent" | "loading" | "brand" | "stimulus" | "questions" | "demographics" | "done";

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

  useEffect(() => {
    if (step !== "stimulus" || group === null) {
      return;
    }

    const frames = treatments[group].images;
    const timeout = window.setTimeout(() => {
      if (frameIndex + 1 < frames.length) {
        setFrameIndex((index) => index + 1);
      } else {
        setStep("questions");
      }
    }, EXPOSURE_MS);

    return () => window.clearTimeout(timeout);
  }, [step, group, frameIndex]);

  const startSurvey = () => {
    setGroup(pickGroup());
    setFrameIndex(0);
    setStep("loading");
  };

  const restart = () => {
    setStep("consent");
    setGroup(null);
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
      setError("Bitte beantworte alle Fragen.");
      return;
    }
    setStep("demographics");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (group === null || !allLikertAnswered) {
      setError("Bitte beantworte alle Fragen.");
      return;
    }

    const parsedAge = Number.parseInt(age, 10);
    if (!Number.isInteger(parsedAge) || parsedAge < 16 || parsedAge > 99) {
      setError("Bitte gib ein gültiges Alter an.");
      return;
    }
    if (!gender || !educationLevel) {
      setError("Bitte fülle alle demografischen Angaben aus.");
      return;
    }

    setSubmitting(true);
    const result = await saveSurveyResponse({
      treatmentGroup: group,
      visawi1: answers.visawi1!,
      visawi2: answers.visawi2!,
      visawi3: answers.visawi3!,
      visawi4: answers.visawi4!,
      comp1: answers.comp1!,
      comp2: answers.comp2!,
      comp3: answers.comp3!,
      trust1: answers.trust1!,
      trust2: answers.trust2!,
      trust3: answers.trust3!,
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
          In dieser kurzen Umfrage lesen Sie zuerst eine kurze Beschreibung eines
          Projektmanagement-Tools und sehen danach nacheinander drei Ausschnitte der Oberfläche.
          Anschließend beantworten Sie einige Fragen zu Ihrem Eindruck.
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
          onClick={startSurvey}
          className="mt-10 w-full rounded-[12px] bg-black px-6 py-3 text-white"
        >
          Teilnehmen
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
            1 = stimme gar nicht zu, 7 = stimme voll zu
          </p>

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
