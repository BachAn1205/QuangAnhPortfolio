"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import { hero } from "@/data/content";

export function HomeHero() {
  return (
    <section className="flex flex-col gap-5">
      <Reveal className={`${glass} @container p-7 md:p-10`}>
        <h1 className="whitespace-nowrap text-[clamp(1.05rem,5.1cqi,2.75rem)] font-semibold leading-none tracking-tight">
          {hero.headline}
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          {hero.tagline}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={hero.ctaPrimaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(13,148,136,0.9)] hover:bg-teal-500 active:scale-[0.98]"
          >
            {hero.ctaPrimary}
            <ArrowRight size={16} weight="bold" />
          </Link>
          <a
            href={hero.ctaSecondaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-teal-800/30 bg-white px-4 py-2.5 text-sm font-semibold text-teal-900 hover:bg-teal-50 active:scale-[0.98] dark:border-teal-200/30 dark:bg-transparent dark:text-teal-50 dark:hover:bg-white/10"
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
          frameClassName="h-72 w-full rounded-xl"
        />
      </Reveal>
    </section>
  );
}
