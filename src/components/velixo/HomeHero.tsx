"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Flask, Users } from "@phosphor-icons/react";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import { hero, leadership, projects } from "@/data/content";

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
            frameClassName="h-full min-h-[340px] w-full rounded-xl"
          />
        </Reveal>
      </section>

      <div className="mt-5 grid gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 xl:grid-cols-5 dark:border-white/10 dark:bg-white/10">
        {hero.metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-zinc-100 p-4 dark:bg-[#070b12]"
          >
            <p className="font-mono text-lg font-semibold tracking-tight">
              {metric.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-[62ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        {hero.support}
      </p>

      <HomePreview />
    </>
  );
}

const pathways = [
  {
    title: "Electronics Developer",
    href: "/projects",
    icon: Cpu,
    text: "Solar EV charging, campus heater control, and sensor circuits built to cut real power use.",
  },
  {
    title: "Engineering Researcher",
    href: "/projects",
    icon: Flask,
    text: "A Grade A EPQ comparing LED and incandescent lighting on efficiency, colour, and reliability.",
  },
  {
    title: "Community Leader",
    href: "/leadership",
    icon: Users,
    text: "House leadership at Bosworth, tournament organisation in Hanoi, and a student venture team.",
  },
] as const;

function HomePreview() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const epq = projects.find((project) => project.id === "epq-lighting");
  const library = projects.find((project) => project.id === "digital-library");
  const [lead, ...rest] = pathways;

  const proofs = [
    {
      href: "/leadership",
      kicker: leadership.featured.awardBadge,
      title: leadership.featured.title,
      text: leadership.featured.overview[0],
    },
    {
      href: "/projects",
      kicker: epq?.gradeBadge ?? "Grade A",
      title: "EPQ: Solid-State vs. Incandescent Lighting",
      text: epq?.highlight ?? "",
    },
    {
      href: "/projects",
      kicker: library?.organization ?? "Bosworth Independent School",
      title: library?.title ?? "Digital Library",
      text: library?.highlight ?? "",
    },
  ];

  const LeadIcon = lead.icon;

  return (
    <div className="mt-8 space-y-14">
      <Reveal className={`${glass} overflow-hidden`}>
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 md:p-8">
            <p className="text-sm font-semibold text-teal-800 dark:text-teal-200">
              Signature project
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {featured.overview[0]}
            </p>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              {featured.awardBadge}
            </p>
            <Link
              href="/projects"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 underline-offset-4 hover:underline dark:text-teal-300"
            >
              View case study
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
          <div className="border-t border-white/10 p-4 dark:border-white/10 lg:border-t-0 lg:border-l lg:p-6">
            <MediaSlot
              slotId="project-evcharge-ai-0"
              alt={`${featured.title} media`}
              guideline={featured.mediaGuides[0]}
              frameClassName="h-64 w-full rounded-2xl lg:h-full lg:min-h-[280px]"
            />
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)]">
        <Reveal>
          <Link
            href={lead.href}
            className={`${glass} flex h-full flex-col p-6 transition hover:-translate-y-0.5`}
          >
            <LeadIcon
              size={22}
              weight="duotone"
              className="text-teal-700 dark:text-teal-300"
            />
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              {lead.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {lead.text}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 dark:text-teal-300">
              Open
              <ArrowRight size={14} weight="bold" />
            </span>
          </Link>
        </Reveal>
        <div className="flex flex-col justify-center gap-6 border-t border-zinc-300 pt-6 dark:border-white/10 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
          {rest.map((path) => {
            const Icon = path.icon;
            return (
              <Link
                key={path.title}
                href={path.href}
                className="group block"
              >
                <span className="inline-flex items-center gap-2 text-teal-700 dark:text-teal-300">
                  <Icon size={18} weight="duotone" />
                  <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {path.title}
                  </span>
                </span>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {path.text}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 group-hover:underline dark:text-teal-300">
                  Open
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-zinc-300 dark:border-white/10">
        {proofs.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="grid gap-1 border-b border-zinc-300 py-5 transition hover:bg-white/40 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-8 dark:border-white/10 dark:hover:bg-white/5"
          >
            <p className="text-sm font-semibold text-teal-800 dark:text-teal-300">
              {item.kicker}
            </p>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {item.text}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
