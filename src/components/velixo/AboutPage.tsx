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

      <div className="mt-8 grid gap-5 lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
          {about.images.map((image, idx) => (
            <Reveal
              key={image.guideline}
              className={`${glass} group overflow-hidden p-3 ${idx === 0 ? "sm:col-span-2" : ""}`}
            >
              <MediaSlot
                slotId={`about-${idx}`}
                alt={image.alt}
                guideline={image.guideline}
                frameClassName={`w-full rounded-xl ${idx === 0 ? "h-56" : "h-44"}`}
              />
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                {image.caption}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className={`${glass} p-7 lg:col-span-7`}>
          <div className="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
