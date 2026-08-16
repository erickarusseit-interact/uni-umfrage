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
  | "aufwand1"
  | "aufwand2"
  | "aufwand3"
  | "comp1"
  | "comp2"
  | "comp3"
  | "comp4"
  | "trust1"
  | "trust2"
  | "trust3"
  | "trust4"
  | "intent1"
  | "intent2"
  | "intent3"
  | "intent4"
  | "attentionCheck"
  | "mc1"
  | "mc2";

export type LikertItem = { id: LikertId; label: string };

export type QuestionBlock = { title: string; items: LikertItem[] };

export const questionBlocks: QuestionBlock[] = [
  {
    title: "Visuelle Ästhetik",
    items: [
      { id: "visawi1", label: "Auf der Oberfläche passt alles zusammen." },
      { id: "visawi2", label: "Das Layout ist angenehm vielseitig." },
      { id: "visawi3", label: "Die farbliche Gesamtgestaltung wirkt attraktiv." },
      { id: "visawi4", label: "Das Layout ist professionell." },
    ],
  },
  {
    title: "Wahrgenommener Aufwand",
    items: [
      {
        id: "aufwand1",
        label: "Für die Gestaltung dieser Oberfläche wurde sichtbar viel Aufwand investiert.",
      },
      {
        id: "aufwand2",
        label: "Die Oberfläche wirkt mit großer Sorgfalt gestaltet.",
      },
      {
        id: "aufwand3",
        label: "Diese Gestaltung wirkt aufwendiger als eine einfache Standardlösung.",
      },
    ],
  },
  {
    title: "Kompetenz",
    items: [
      { id: "comp1", label: "AuraFlow wirkt kompetent." },
      { id: "comp2", label: "AuraFlow wirkt fähig." },
      { id: "comp3", label: "AuraFlow wirkt selbstbewusst." },
      { id: "comp4", label: "AuraFlow wirkt effizient." },
    ],
  },
  {
    title: "Vertrauen",
    items: [
      {
        id: "trust1",
        label: "Ich würde bei AuraFlow finden, was ich von einer solchen Software erwarte.",
      },
      {
        id: "trust2",
        label: "AuraFlow würde stets meinen Erwartungen entsprechen.",
      },
      {
        id: "trust3",
        label: "AuraFlow würde mir ein Gefühl von Vertrauen und Sicherheit bei der Nutzung geben.",
      },
      {
        id: "trust4",
        label: "AuraFlow würde mich nicht enttäuschen.",
      },
    ],
  },
  {
    title: "Intentionalität",
    items: [
      {
        id: "intent1",
        label: "AuraFlow wäre ehrlich und aufrichtig in seinen Erklärungen.",
      },
      {
        id: "intent2",
        label: "Ich könnte mich auf AuraFlow verlassen.",
      },
      {
        id: "attentionCheck",
        label:
          "Bitte wählen Sie bei dieser Aussage die Antwortoption „stimme eher zu“, um zu zeigen, dass Sie die Aussagen aufmerksam lesen.",
      },
      {
        id: "intent3",
        label: "AuraFlow würde alles daransetzen, mich zufriedenzustellen.",
      },
      {
        id: "intent4",
        label: "AuraFlow würde mich in irgendeiner Form entschädigen, falls es ein Problem gäbe.",
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

export const LIKERT_LABELS = {
  1: "stimme gar nicht zu",
  2: "stimme nicht zu",
  3: "stimme eher nicht zu",
  4: "teils/teils",
  5: "stimme eher zu",
  6: "stimme zu",
  7: "stimme voll zu",
} as const;

/** Korrekte Antwort des eingebetteten Aufmerksamkeitschecks (zählt nicht zur Skala). */
export const ATTENTION_CHECK_VALUE = 5;

export const screeningQuestions = [
  {
    id: "s1" as const,
    label:
      "Nutzen Sie im Rahmen Ihrer beruflichen Tätigkeit regelmäßig (mindestens mehrmals pro Woche) digitale Arbeits- oder Projektmanagement-Software?",
  },
  {
    id: "s2" as const,
    label:
      "Waren oder sind Sie beruflich an der Konzeption, Gestaltung oder Entwicklung von Projektmanagement-Software beteiligt?",
  },
] as const;

export function isEligible(s1: boolean, s2: boolean): boolean {
  return s1 === true && s2 === false;
}
