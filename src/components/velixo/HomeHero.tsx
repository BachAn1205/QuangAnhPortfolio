"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import { hero } from "@/data/content";

export function HomeHero() {
  return (
    <>
      <section className="grid items-stretch gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className={`${glass} p-7 md:p-10`}>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            {hero.tagline}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={hero.ctaPrimaryHref}
              className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(13,148,136,0.9)] hover:bg-teal-500 active:scale-[0.98]"
            >
              {hero.ctaPrimary}
              <ArrowRight size={16} weight="bold" />
            </Link>
            <a
              href={hero.ctaSecondaryHref}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/30 px-4 py-2.5 text-sm font-semibold backdrop-blur dark:border-white/15 dark:bg-white/5"
            >
              {hero.ctaSecondary}
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className={`${glass} overflow-hidden p-3`}>
          <MediaSlot
            slotId="hero-portrait"
            alt={hero.portraitAlt}
            guideline={hero.portraitGuideline}
            frameClassName="h-full min-h-[340px] w-full rounded-xl"
          />
        </Reveal>
      </section>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {hero.metrics.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 0.04} className={`${glass} p-4`}>
            <p className="text-lg font-semibold tracking-tight">{metric.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {metric.detail}
            </p>
          </Reveal>
        ))}
      </div>
    </>
  );
}
