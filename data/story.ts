import { assets } from "@/data/assets";

export const storyChapters = [
  {
    index: "01",
    label: "REDUCTION",
    title: "No panel without a job.",
    body: "The shell begins as a single field. Reinforcement is welded only where the foot transfers load; everything else is allowed to stay open. What looks like restraint is a structural decision, not a decorative one.",
  },
  {
    index: "02",
    label: "TRANSFER",
    title: "Load follows line.",
    body: "A TPU cage is heat-bonded into the knit rather than stitched on top of it. The frame spreads pressure across the instep, so the lacing can stay soft and the midfoot can stay close.",
  },
  {
    index: "03",
    label: "SIGNAL",
    title: "One colour, used as information.",
    body: "Acid appears at the flex zone and nowhere else. It is a way to read how the object moves, not a seasonal flash. Graphite carries the mass; chalk exposes the core; the signal explains it.",
  },
] as const;

export const storyReferences = [
  {
    image: assets.architectureCurves.src,
    alt: assets.architectureCurves.alt,
    label: "STRUCTURE / 01",
    caption: "A facade resolving load into a curve. Architectural reference.",
    source: assets.architectureCurves.source,
  },
  {
    image: assets.atelier.src,
    alt: assets.atelier.alt,
    label: "HAND / 02",
    caption: "Material inspected at the edge. Process reference.",
    source: assets.atelier.source,
  },
  {
    image: assets.packaging.src,
    alt: assets.packaging.alt,
    label: "RETURN / 03",
    caption: "Uncoated board, no excess. Packaging direction.",
    source: assets.packaging.source,
  },
] as const;
