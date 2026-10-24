"use client";

import { MediaSlot } from "@/components/shared/MediaSlot";
import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import { leadership } from "@/data/content";

export function LeadershipPage() {
  return (
    <section>
      <Reveal>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          {leadership.heading}
        </h1>
      </Reveal>

      <Reveal className={`${glass} mt-8 p-6 md:p-8`}>
        <h2 className="text-3xl font-semibold">
          {leadership.featured.title}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {leadership.featured.subtitle}
        </p>
        <p className="mt-4 inline-flex rounded-full border border-white/20 bg-white/30 px-3 py-1 text-xs font-semibold backdrop-blur dark:bg-white/10">
          {leadership.featured.awardBadge}
        </p>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          {leadership.featured.role} | {leadership.featured.location} |{" "}
          {leadership.featured.timeline}
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {leadership.featured.overview.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
          {leadership.featured.reflection}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {leadership.featured.mediaGuides.map((guide, idx) => (
            <MediaSlot
              key={guide}
              slotId={`leadership-featured-${idx}`}
              alt={`${leadership.featured.title} media ${idx + 1}`}
              guideline={guide}
              frameClassName="h-28 w-full rounded-2xl"
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          {leadership.featured.mediaNote}
        </p>
      </Reveal>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {[leadership.uk, leadership.vietnam].map((column) => (
          <Reveal key={column.title} className={`${glass} p-6`}>
            <h2 className="text-lg font-semibold">{column.title}</h2>
            <div className="mt-4 space-y-5">
              {column.roles.map((role) => (
                <div key={role.title}>
                  <p className="font-semibold">{role.title}</p>
                  <p className="text-xs text-zinc-500">{role.timeline}</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                    {role.bullets.map((b) => (
                      <li key={b.slice(0, 48)}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <MediaSlot
                slotId={
                  column.title === leadership.uk.title
                    ? "leadership-bosworth"
                    : "leadership-csp"
                }
                alt={column.photoAlt}
                guideline={column.photoGuideline}
                frameClassName="h-44 w-full rounded-2xl"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
