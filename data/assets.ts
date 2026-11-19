/**
 * Centralised image registry.
 *
 * All photographs are sourced from Unsplash and used as campaign /
 * art-direction reference imagery under the Unsplash License:
 * https://unsplash.com/license
 *
 * These are photographs of third-party footwear. They are not photographs
 * of a manufactured AFTERFORM product, and no affiliation is claimed.
 * Replace these files in /public/images to use original product photography.
 */

const U = "https://images.unsplash.com/photo-";

export const assets = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Two graphite technical knit sneakers with acid-green accents suspended above a footbridge, used as campaign reference imagery.",
    source: `${U}1562183241-b937e95585b6`,
    license: "Unsplash License",
  },
  profile: {
    src: "/images/study-profile.jpg",
    alt: "Pair of graphite knit sneakers with acid-green accents, three-quarter view, campaign study.",
    source: `${U}1562183241-b937e95585b6`,
    license: "Unsplash License",
  },
  shell: {
    src: "/images/study-shell.jpg",
    alt: "Macro study of an open technical knit upper with cord lacing and a graphite cage.",
    source: `${U}1562183241-b937e95585b6`,
    license: "Unsplash License",
  },
  core: {
    src: "/images/study-core.jpg",
    alt: "Close study of a graphite knit sneaker with a lime-green core visible through the lattice upper.",
    source: `${U}1562183241-b937e95585b6`,
    license: "Unsplash License",
  },
  contact: {
    src: "/images/study-contact.jpg",
    alt: "On-foot reference study of a black, white and rust high-top sneaker against a glass facade.",
    source: `${U}1556906781-9a412961c28c`,
    license: "Unsplash License",
  },
  acquire: {
    src: "/images/acquire.jpg",
    alt: "Graphite technical knit sneaker with acid-green accent, detail study for the release page.",
    source: `${U}1562183241-b937e95585b6`,
    license: "Unsplash License",
  },
  knitStory: {
    src: "/images/knit-story.jpg",
    alt: "Graphite knit sneaker study with lime detailing and elastic cord lacing.",
    source: `${U}1562183241-b937e95585b6`,
    license: "Unsplash License",
  },
  lookOnfoot: {
    src: "/images/look-onfoot.jpg",
    alt: "On-foot reference study of a high-top sneaker styled against an urban glass building.",
    source: `${U}1556906781-9a412961c28c`,
    license: "Unsplash License",
  },
  lookPortrait: {
    src: "/images/look-portrait.jpg",
    alt: "Streetwear portrait of a person in a black leather jacket seated against a brick facade.",
    source: `${U}1520975916090-3105956dac38`,
    license: "Unsplash License",
  },
  lookMaterial: {
    src: "/images/look-material.jpg",
    alt: "Close-up material study of a technical knit sneaker upper with lime underlay.",
    source: `${U}1562183241-b937e95585b6`,
    license: "Unsplash License",
  },
  lookPackaging: {
    src: "/images/look-packaging.jpg",
    alt: "Minimal cardboard packaging study on a warm neutral background.",
    source: `${U}1595246140625-573b715d11dc`,
    license: "Unsplash License",
  },
  lookStudio: {
    src: "/images/look-studio.jpg",
    alt: "Studio study of a black textured sneaker beside a white sphere.",
    source: `${U}1543508282-6319a3e2621f`,
    license: "Unsplash License",
  },
  lookCourt: {
    src: "/images/look-court.jpg",
    alt: "Pair of black and red high-top sneakers photographed on a painted court.",
    source: `${U}1552346154-21d32810aba3`,
    license: "Unsplash License",
  },
  lookArchitecture: {
    src: "/images/look-architecture.jpg",
    alt: "Angular white cultural building with a faceted metal volume against a pale sky.",
    source: `${U}1487958449943-2429e8be8625`,
    license: "Unsplash License",
  },
  architectureWide: {
    src: "/images/architecture-wide.jpg",
    alt: "Angular contemporary building in pale metal and glass, architectural reference.",
    source: `${U}1487958449943-2429e8be8625`,
    license: "Unsplash License",
  },
  architectureCurves: {
    src: "/images/architecture-curves.jpg",
    alt: "Sweeping curved facade of a modern building seen from below.",
    source: `${U}1518005020951-eccb494ad742`,
    license: "Unsplash License",
  },
  drafting: {
    src: "/images/drafting-wide.jpg",
    alt: "Hands drawing architectural plans with a ruler on a dark timber table.",
    source: `${U}1503387762-592deb58ef4e`,
    license: "Unsplash License",
  },
  atelier: {
    src: "/images/atelier.jpg",
    alt: "A hand holding a pair of worn leather shoes against a white backdrop.",
    source: `${U}1512675828443-4f454c42253a`,
    license: "Unsplash License",
  },
  packaging: {
    src: "/images/packaging-wide.jpg",
    alt: "Minimal cardboard mailer and product box on a warm beige surface.",
    source: `${U}1595246140625-573b715d11dc`,
    license: "Unsplash License",
  },
  towers: {
    src: "/images/towers.jpg",
    alt: "Dark glass towers photographed from street level against an overcast sky.",
    source: `${U}1486406146926-c627a92ad1ab`,
    license: "Unsplash License",
  },
} as const;

export type AssetKey = keyof typeof assets;

export const imageCredits = Object.entries(assets)
  .map(([key, asset]) => ({ key, ...asset }))
  .filter(
    (asset, index, all) =>
      all.findIndex((candidate) => candidate.src === asset.src) === index,
  );
