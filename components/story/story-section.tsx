import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { assets } from "@/data/assets";
import { campaign } from "@/data/campaign";
import { storyChapters, storyReferences } from "@/data/story";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative overflow-hidden bg-ink py-20 text-ivory sm:py-24 lg:py-32"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-16 select-none font-display text-[34vw] leading-none text-white/[0.018]"
      >
        001
      </span>

      <div className="container-editorial relative">
        <Reveal>
          <SectionLabel index="03" theme="light">
            Form / Manifesto
          </SectionLabel>
        </Reveal>

        <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <h2
              id="story-title"
              className="display text-[clamp(3.3rem,7.5vw,8.2rem)] leading-[0.9] tracking-[-0.018em]"
            >
              {campaign.manifesto.heading.map((line, index) => (
                <span
                  key={line}
                  className={cn(
                    "block",
                    index === 2 && "text-outline-ivory",
                    index === 1 && "pl-[8%]",
                    index === 2 && "pl-[16%]",
                    index === 3 && "pl-[24%]",
                  )}
                >
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col justify-end lg:col-span-4">
            <p className="max-w-[42ch] text-[13px] leading-[1.75] text-ivory/62">
              {campaign.manifesto.intro}
            </p>
            <p className="mt-5 max-w-[42ch] border-t border-white/14 pt-5 text-[12px] leading-[1.75] text-ivory/42">
              {campaign.manifesto.body}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-acid" />
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-ivory/40">
                DESIGN STUDY / AF—001
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="group relative aspect-[4/3] overflow-hidden bg-graphite">
              <Image
                src={assets.knitStory.src}
                alt={assets.knitStory.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="image-warm object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/55">
                  MATERIAL STUDY / 01
                </span>
                <span className="border border-white/20 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/50">
                  REFERENCE
                </span>
              </div>
              <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 border-t border-white/18 pt-4">
                <p className="max-w-[36ch] font-mono text-[9px] uppercase leading-[1.6] tracking-[0.12em] text-ivory/65">
                  Open knit / cord lacing / acid underlay. Campaign reference
                  image, not production photography.
                </p>
                <span className="hidden font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/35 sm:block">
                  FRAME 02
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-3 lg:col-span-5">
            <Reveal delay={0.08}>
              <figure className="group relative aspect-[16/9] overflow-hidden bg-graphite">
                <Image
                  src={assets.drafting.src}
                  alt={assets.drafting.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 36vw"
                  className="image-warm object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/60">
                    PROCESS / LOAD PATHS
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/30">
                    02
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.16}>
              <blockquote className="relative flex h-full flex-col justify-between border border-white/14 p-6">
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-2 font-display text-[5rem] leading-none text-acid/20"
                >
                  “
                </span>
                <p className="display relative max-w-[18ch] text-[clamp(1.7rem,3vw,2.55rem)] leading-[0.95] text-ivory">
                  {campaign.manifesto.quote}
                </p>
                <footer className="mt-8 flex items-center gap-3">
                  <span aria-hidden="true" className="size-1.5 bg-acid" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/40">
                    DESIGN NOTE / AFTERFORM
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 border-t border-white/14 sm:mt-16">
          {storyChapters.map((chapter, index) => (
            <Reveal
              key={chapter.index}
              delay={index * 0.05}
              as="div"
              className="grid gap-4 border-b border-white/14 py-6 md:grid-cols-12 md:gap-8 md:py-7"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-ivory/35 md:col-span-2">
                {chapter.index} / {chapter.label}
              </p>
              <h3 className="font-sans text-[19px] font-medium leading-[1.15] tracking-[-0.03em] text-ivory md:col-span-4 md:text-[22px]">
                {chapter.title}
              </h3>
              <p className="max-w-[58ch] text-[12px] leading-[1.7] text-ivory/50 md:col-span-6">
                {chapter.body}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {storyReferences.map((reference, index) => (
            <Reveal key={reference.label} delay={index * 0.06}>
              <figure className="group relative aspect-[4/3] overflow-hidden bg-graphite">
                <Image
                  src={reference.image}
                  alt={reference.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 32vw"
                  className="image-warm object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-ivory/70">
                      {reference.label}
                    </p>
                    <p className="mt-1 max-w-[26ch] font-mono text-[7px] uppercase leading-[1.6] tracking-[0.1em] text-ivory/38">
                      {reference.caption}
                    </p>
                  </div>
                  <a
                    href={reference.source}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View source for ${reference.label} on Unsplash`}
                    className="grid size-8 shrink-0 place-items-center border border-white/20 text-ivory/45 transition hover:border-acid hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
