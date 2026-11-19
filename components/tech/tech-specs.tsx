import Image from "next/image";
import { Info } from "lucide-react";
import { assets } from "@/data/assets";
import { product } from "@/data/product";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function TechSpecs() {
  return (
    <section
      id="tech-file"
      aria-labelledby="tech-title"
      className="relative isolate overflow-hidden bg-ink py-20 text-ivory sm:py-24 lg:py-32"
    >
      <Image
        src={assets.towers.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/82 to-ink" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(241,240,233,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(241,240,233,0.1) 1px, transparent 1px)",
          backgroundSize: "25% 100%, 100% 120px",
        }}
      />

      <div className="container-editorial relative">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 border-b border-white/14 pb-4">
          <SectionLabel index="04" theme="light">
            Technical file
          </SectionLabel>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/40">
            ILLUSTRATIVE SPECIFICATION / PRE-PRODUCTION
          </span>
        </Reveal>

        <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <h2
              id="tech-title"
              className="display text-[clamp(3.1rem,7vw,7.8rem)] leading-[0.9] tracking-[-0.018em]"
            >
              ENGINEERED
              <br />
              <span className="text-outline-ivory">ABSENCE.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end lg:col-span-4">
            <p className="max-w-[38ch] text-[13px] leading-[1.7] text-ivory/60">
              Six readings of one object. Every value below is an illustrative
              design target for the concept, not a verified production
              datasheet.
            </p>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.13em] text-ivory/35">
              GRAPHITE / CHALK / ACID SIGNAL
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 lg:mt-14 lg:grid-cols-12">
          <div className="grid gap-3 lg:col-span-4">
            <Reveal>
              <div className="glass-panel relative overflow-hidden p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ivory/45">
                    MASS / SINGLE
                  </span>
                  <span className="size-1.5 bg-acid" aria-hidden="true" />
                </div>
                <p className="display mt-12 flex items-end text-[clamp(4.4rem,9vw,7rem)] leading-[0.74]">
                  342
                  <span className="mb-1 ml-2 font-mono text-[12px] tracking-[0.08em] text-acid">
                    g
                  </span>
                </p>
                <p className="mt-4 font-mono text-[8px] uppercase leading-[1.7] tracking-[0.12em] text-ivory/40">
                  US 9 / single shoe / pre-production sample mass
                </p>
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-full bg-gradient-to-r from-acid/70 to-transparent"
                />
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <figure className="group relative aspect-[4/3] overflow-hidden">
                <Image
                  src={assets.architectureWide.src}
                  alt={assets.architectureWide.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 30vw"
                  className="image-warm object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-ink/10" />
                <figcaption className="absolute inset-x-4 bottom-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-ivory/65">
                    CONTEXT / STRUCTURAL REFERENCE
                  </p>
                  <p className="mt-1 font-mono text-[7px] uppercase leading-[1.6] tracking-[0.1em] text-ivory/35">
                    Load resolved into a plane. Architectural study, not product
                    imagery.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {product.specs.map((spec, index) => (
              <Reveal key={spec.index} delay={0.04 + index * 0.035}>
                <article className="glass-panel group flex h-full flex-col p-5 transition-colors duration-500 hover:border-acid/45">
                  <div className="flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/35">
                    <span>{spec.index}</span>
                    <span>{spec.label}</span>
                  </div>
                  <h3 className="mt-8 font-sans text-[20px] font-medium leading-[1.05] tracking-[-0.04em] text-ivory">
                    {spec.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-acid">
                    {spec.value}
                  </p>
                  <p className="mt-3 text-[11px] leading-[1.65] text-ivory/45">
                    {spec.description}
                  </p>
                  <div
                    aria-hidden="true"
                    className="mt-auto flex items-center gap-1 pt-6"
                  >
                    <span className="h-px flex-1 bg-white/10 transition-colors duration-500 group-hover:bg-acid/30" />
                    <span className="size-1 bg-white/15 transition-colors duration-500 group-hover:bg-acid" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.08}>
          <div className="glass-panel mt-3 grid gap-8 p-6 sm:p-7 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/45">
                Material register
              </p>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {product.materials.map((material, index) => (
                  <li
                    key={material}
                    className="flex items-baseline gap-3 border-b border-white/10 py-2 text-[11px] leading-snug text-ivory/55"
                  >
                    <span className="font-mono text-[8px] tracking-[0.08em] text-ivory/25">
                      M{String(index + 1).padStart(2, "0")}
                    </span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/45">
                Care / handling
              </p>
              <ol className="mt-4 grid gap-2">
                {product.care.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="flex items-baseline gap-3 text-[11px] leading-[1.55] text-ivory/50"
                  >
                    <span className="font-mono text-[8px] text-acid/70">
                      C{index + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>

        <p className="mt-5 flex max-w-[90ch] items-start gap-2 font-mono text-[8px] uppercase leading-[1.8] tracking-[0.1em] text-ivory/30">
          <Info
            aria-hidden="true"
            className="mt-0.5 size-3 shrink-0"
            strokeWidth={1.5}
          />
          {product.specDisclaimer} {product.madeIn}.
        </p>
      </div>
    </section>
  );
}
