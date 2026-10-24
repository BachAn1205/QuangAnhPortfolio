"use client";

import { MediaSlot } from "@/components/shared/MediaSlot";
import { HomeHero } from "@/components/velixo/HomeHero";
import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import { about } from "@/data/content";

export function AboutPage() {
  return (
    <section>
      <HomeHero />

      <Reveal>
        <h2 className="mt-14 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          {about.heading}
        </h2>
      </Reveal>

      <Reveal className={`${glass} mt-8 p-7`}>
        <div className="grid gap-6 md:grid-cols-3">
          {about.paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300"
            >
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {about.images.map((image, idx) => (
          <Reveal key={image.guideline} className={`${glass} overflow-hidden p-3`}>
            <MediaSlot
              slotId={`about-${idx}`}
              alt={image.alt}
              guideline={image.guideline}
              frameClassName="h-44 w-full rounded-xl"
            />
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {image.caption}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
