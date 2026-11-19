import { assets } from "@/data/assets";
import type { InspectionFrame, ProductSpec, SizeVariant } from "@/types";

export const product = {
  slug: "afterform-001",
  name: "AFTERFORM 001",
  shortName: "001",
  edition: "EDITION 001",
  editionSize: 300,
  priceCents: 28500,
  currency: "EUR",
  colorway: "Graphite / Chalk",
  colorwayCode: "AF-001-GC",
  acidSignal: "Acid counter",
  releaseDate: "17.11.2026",
  description:
    "A study in subtraction. An open technical knit is bonded to a welded TPU cage, then set over a hollow-channel EVA core. The upper breathes where the foot moves; structure appears only where it carries load. Graphite through the shell, chalk beneath, one acid signal at the heel.",
  shortDescription:
    "Bonded technical knit / hollow-core EVA / one acid signal.",
  upper: "Bonded technical knit + welded TPU frame",
  sole: "Hollow-channel dual-density EVA",
  outsole: "Directional rubber grid, 4.5 mm lugs",
  weight: "342 g (US 9, single shoe)",
  fit: "True to size / narrow midfoot",
  madeIn: "Illustrative pre-production study",
  materials: [
    "Open technical knit shell",
    "Welded TPU structural cage",
    "Recycled polyester internal sleeve",
    "Dual-density EVA hollow core",
    "Directional rubber outsole",
    "Acid-dyed heel counter",
  ],
  care: [
    "Wipe the shell with a soft damp cloth.",
    "Do not machine wash or tumble dry.",
    "Air-dry away from direct heat.",
    "Store with the included form insert.",
  ],
  sizes: [
    { us: "7", uk: "6", eu: "40", cm: "25.0" },
    { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.4" },
    { us: "8", uk: "7", eu: "41", cm: "26.0" },
    { us: "8.5", uk: "7.5", eu: "42", cm: "26.5" },
    { us: "9", uk: "8", eu: "42.5", cm: "27.0" },
    { us: "9.5", uk: "8.5", eu: "43", cm: "27.4" },
    { us: "10", uk: "9", eu: "44", cm: "28.0" },
    { us: "10.5", uk: "9.5", eu: "44.5", cm: "28.4" },
    { us: "11", uk: "10", eu: "45", cm: "29.0" },
    { us: "11.5", uk: "10.5", eu: "45.5", cm: "29.4" },
    { us: "12", uk: "11", eu: "46", cm: "30.0" },
    { us: "13", uk: "12", eu: "47", cm: "30.5" },
  ] satisfies SizeVariant[],
  specs: [
    {
      index: "01",
      label: "UPPER",
      title: "FORM SHELL",
      value: "2-layer knit",
      description:
        "An open technical knit bonded to a heat-welded TPU frame. Reinforcement follows load lines; the rest stays open.",
    },
    {
      index: "02",
      label: "CORE",
      title: "HOLLOW CORE",
      value: "26 / 20 mm",
      description:
        "Dual-density EVA with a lateral void and a chalk perimeter wall. Heel stack 26 mm, forefoot 20 mm.",
    },
    {
      index: "03",
      label: "OUTSOLE",
      title: "GRID / 4.5",
      value: "4.5 mm lugs",
      description:
        "Directional lugs index forward motion. A wider heel pad and medial pivot zone sharpen contact.",
    },
    {
      index: "04",
      label: "MASS",
      title: "342 GRAMS",
      value: "US 9 / single",
      description:
        "Pre-production sample mass. Weight is carried low and forward, close to the ground line.",
    },
    {
      index: "05",
      label: "LAST",
      title: "AF–01",
      value: "True to size",
      description:
        "A close, architectural fit through the midfoot with a roomier toe box. Between sizes, take the larger.",
    },
    {
      index: "06",
      label: "COLOUR",
      title: "GRAPHITE / CHALK",
      value: "Acid signal",
      description:
        "Graphite shell, chalk core, acid-dyed counter. One colour used as information, not decoration.",
    },
  ] satisfies ProductSpec[],
  inspectionFrames: [
    {
      id: "profile",
      label: "PROFILE",
      title: "The whole object.",
      caption:
        "A pair held in suspension. The shell reads as one continuous surface; the core is visible only where the knit opens.",
      image: assets.profile.src,
      alt: assets.profile.alt,
      hotspots: [
        {
          id: "shell",
          x: 68,
          y: 36,
          label: "FORM SHELL",
          title: "A structural skin.",
          body: "The upper is conceived as two layers: an open knit for breath, a welded TPU frame for structure. Each appears only where the foot demands it. Annotation is illustrative.",
        },
        {
          id: "signal",
          x: 55,
          y: 64,
          label: "ACID SIGNAL",
          title: "One colour, used as information.",
          body: "The acid underlay marks the medial flex zone. It is a way to read orientation and movement, not a decorative flash. Annotation is illustrative.",
        },
        {
          id: "collar",
          x: 79,
          y: 20,
          label: "CUT / COLLAR",
          title: "Cut close. Sit clean.",
          body: "A low, sculpted collar follows the ankle without padding bulk. The internal sleeve is designed to hold the midfoot without a separate tongue float. Annotation is illustrative.",
        },
      ],
    },
    {
      id: "shell",
      label: "SHELL",
      title: "Open by design.",
      caption:
        "At close range, the knit reads as architecture: diamond cells, elastic cord, a cage that disappears into the surface.",
      image: assets.shell.src,
      alt: assets.shell.alt,
      hotspots: [
        {
          id: "weave",
          x: 43,
          y: 38,
          label: "OPEN WEAVE",
          title: "Air where it matters.",
          body: "The cell structure is designed to move independently of the cage. The intended result is ventilation without visible seams. Annotation is illustrative.",
        },
        {
          id: "cord",
          x: 66,
          y: 57,
          label: "CORD LACE",
          title: "Tension without panels.",
          body: "Elastic cord distributes pressure across the instep instead of concentrating it at eyelets. A single pull adjusts the whole shell. Annotation is illustrative.",
        },
      ],
    },
    {
      id: "core",
      label: "CORE",
      title: "A visible absence.",
      caption:
        "The lime channel is the only interruption in the graphite field. It exposes the logic of the midsole rather than hiding it.",
      image: assets.core.src,
      alt: assets.core.alt,
      hotspots: [
        {
          id: "void",
          x: 37,
          y: 55,
          label: "LATERAL VOID",
          title: "Remove the middle.",
          body: "A hollow runs through the lateral core to reduce mass and allow the heel to compress independently. The lime liner makes the void legible. Annotation is illustrative.",
        },
        {
          id: "wall",
          x: 64,
          y: 77,
          label: "PERIMETER WALL",
          title: "Support at the edge.",
          body: "A denser EVA perimeter holds the foot over the softer centre. The geometry, not an insert, provides stability. Annotation is illustrative.",
        },
      ],
    },
    {
      id: "contact",
      label: "CONTACT",
      title: "The ground line.",
      caption:
        "On foot, the object is tested against its environment. The outsole geometry, dark upper and negative space do the work.",
      image: assets.contact.src,
      alt: assets.contact.alt,
      hotspots: [
        {
          id: "outsole",
          x: 48,
          y: 75,
          label: "GRID OUTSOLE",
          title: "Grip as a pattern.",
          body: "Directional lugs run in a single orientation, with a wider heel pad for impact. The pattern is designed to shed surface water. Annotation is illustrative.",
        },
        {
          id: "pivot",
          x: 62,
          y: 58,
          label: "PIVOT ZONE",
          title: "Turn on the forefoot.",
          body: "A medial channel is intended to let the forefoot rotate without dragging the heel. The sole is segmented rather than continuous. Annotation is illustrative.",
        },
      ],
    },
  ] satisfies InspectionFrame[],
  specDisclaimer:
    "Illustrative pre-production specification. Not a verified production datasheet. Materials, mass and construction are subject to change.",
  inventoryNote:
    "The 300-pair edition is the proposed campaign premise, not a production run. Frontend availability is a 42-pair illustrative allocation — not live warehouse inventory.",
} as const;

export type Product = typeof product;
