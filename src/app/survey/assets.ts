export const EXPOSURE_MS = 10000;

export type TreatmentGroup = 1 | 2 | 3 | 4;

const UI_A = [
  "/treatments/a/fokus-projects.png",
  "/treatments/a/fokus-project-detail.png",
  "/treatments/a/fokus-create-task.png",
] as const;

const UI_B = [
  "/treatments/b/fokus-ds-projects.png",
  "/treatments/b/fokus-ds-project-detail.png",
  "/treatments/b/fokus-ds-create-task.png",
] as const;

const STATEMENT_1 =
  "AuraFlow organisiert die Arbeit Ihres Teams mit hoher Präzision. Automatisierte Workflows, klare Priorisierung und Echtzeit-Statusübersichten sorgen dafür, dass nichts liegen bleibt. Deadlines werden konsequent eingehalten, Ressourcen effizient eingesetzt. AuraFlow ist darauf ausgelegt, Teams messbar leistungsfähiger zu machen.";
const STATEMENT_2 =
  "AuraFlow steht für einen sorgsamen Umgang mit den Daten Ihres Teams. Informationen werden verschlüsselt gespeichert, Zugriffsrechte bleiben jederzeit transparent nachvollziehbar. Änderungen an Projekten werden zuverlässig dokumentiert. AuraFlow ist darauf ausgelegt, Vertrauen im Team spürbar zu stärken.";

export const treatments: Record<
  TreatmentGroup,
  {
    images: readonly [string, string, string];
    brandStatement: string;
    aesthetic: "high" | "low";
    brand: "1" | "2";
  }
> = {
  1: { images: UI_A, brandStatement: STATEMENT_1, aesthetic: "high", brand: "1" },
  2: { images: UI_A, brandStatement: STATEMENT_2, aesthetic: "high", brand: "2" },
  3: { images: UI_B, brandStatement: STATEMENT_1, aesthetic: "low", brand: "1" },
  4: { images: UI_B, brandStatement: STATEMENT_2, aesthetic: "low", brand: "2" },
};

export type LikertId =
  | "visawi1"
  | "visawi2"
  | "visawi3"
  | "visawi4"
  | "comp1"
  | "comp2"
  | "comp3"
  | "trust1"
  | "trust2"
  | "trust3"
  | "mc1"
  | "mc2";

export type LikertItem = { id: LikertId; label: string };

export type QuestionBlock = { title: string; items: LikertItem[] };

export const questionBlocks: QuestionBlock[] = [
  {
    title: "Visuelle Ästhetik",
    items: [
      { id: "visawi1", label: "Die Oberfläche ist übersichtlich gestaltet." },
      { id: "visawi2", label: "Die Gestaltung der Oberfläche ist originell." },
      { id: "visawi3", label: "Die Farbgestaltung ist angenehm." },
      { id: "visawi4", label: "Die Oberfläche wirkt professionell gestaltet." },
    ],
  },
  {
    title: "Kompetenz",
    items: [
      { id: "comp1", label: "Das Unternehmen hinter diesem Tool wirkt kompetent." },
      { id: "comp2", label: "Das Unternehmen hinter diesem Tool wirkt fähig." },
      { id: "comp3", label: "Das Unternehmen hinter diesem Tool wirkt fachkundig." },
    ],
  },
  {
    title: "Vertrauen",
    items: [
      { id: "trust1", label: "Ich würde diesem Tool vertrauen." },
      {
        id: "trust2",
        label: "Das Unternehmen hinter diesem Tool wirkt vertrauenswürdig.",
      },
      {
        id: "trust3",
        label: "Ich hätte keine Bedenken, dieses Tool beruflich zu nutzen.",
      },
    ],
  },
  {
    title: "Eindruck der Oberfläche",
    items: [
      { id: "mc1", label: "Die Oberfläche wirkte visuell hochwertig gestaltet." },
      {
        id: "mc2",
        label: "Mir sind visuelle Fehler oder Unstimmigkeiten aufgefallen.",
      },
    ],
  },
];

export const genderOptions = [
  "weiblich",
  "männlich",
  "divers",
  "keine Angabe",
] as const;

export const educationOptions = [
  "Mittlere Reife / Realschulabschluss",
  "Abitur / Fachhochschulreife",
  "Bachelor",
  "Master / Diplom",
  "Promotion",
  "Sonstiges",
] as const;

export const LIKERT_VALUES = [1, 2, 3, 4, 5, 6, 7] as const;
