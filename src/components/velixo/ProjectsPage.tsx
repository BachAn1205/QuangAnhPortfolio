"use client";

import { useState } from "react";
import {
  CaretDown,
  Circuitry,
  Cpu,
  Flask,
  Medal,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import {
  projects,
  projectsSection,
  site,
  type Project,
} from "@/data/content";

function EngineeringLog({ project }: { project: Project }) {
  const [open, setOpen] = useState(project.featured ?? false);

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-teal-600/30 bg-teal-600/10 px-3 py-1.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-600/15 active:scale-[0.98] dark:border-teal-400/30 dark:bg-teal-400/10 dark:text-teal-200"
      >
        <Circuitry size={16} weight="duotone" />
        Behind the Scenes: Engineering Log
        <CaretDown
          size={14}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-2xl border border-white/15 bg-gradient-to-br from-teal-500/10 to-transparent p-4 dark:from-teal-400/10">
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                {project.behindTheScenes}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function TechStack({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-teal-700/20 bg-teal-700/10 px-2.5 py-1 font-mono text-[11px] font-medium text-teal-900 dark:border-teal-300/20 dark:bg-teal-400/10 dark:text-teal-100"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function FeaturedCase({ project }: { project: Project }) {
  return (
    <Reveal className={`${glass} relative overflow-hidden`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.12),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(13,148,136,0.14),transparent_50%)]" />
      <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-900 dark:text-amber-100">
              <Medal size={14} weight="fill" />
              Signature Project
            </span>
            <span className="rounded-full border border-white/20 bg-white/30 px-2.5 py-1 text-[11px] font-medium text-zinc-700 backdrop-blur dark:bg-white/10 dark:text-zinc-200">
              {project.domain}
            </span>
          </div>

          {project.awardBadge ? (
            <p className="mt-4 text-sm font-semibold text-amber-800 dark:text-amber-200">
              {project.awardBadge}
            </p>
          ) : null}

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {project.title}
          </h2>
          <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.highlight}
          </p>

          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            {project.role}
            {project.organization ? ` | ${project.organization}` : ""} |{" "}
            {project.timeline}
          </p>

          <div className="mt-5">
            <TechStack tags={project.techStack} />
          </div>

          <ul className="mt-6 space-y-3">
            {project.overview.map((item) => (
              <li
                key={item}
                className="border-l-2 border-teal-500/50 pl-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>

          <EngineeringLog project={project} />
          <p className="mt-4 text-xs text-zinc-500">{project.mediaNote}</p>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-1 lg:p-6">
          {project.mediaGuides.map((guide, idx) => (
            <MediaSlot
              key={`${project.id}-f-${idx}`}
              slotId={`project-${project.id}-${idx}`}
              alt={`${project.title} media ${idx + 1}`}
              guideline={guide}
              frameClassName={
                idx === 0
                  ? "h-52 w-full rounded-2xl lg:h-64"
                  : "h-40 w-full rounded-2xl"
              }
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function CaseStudy({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flip = index % 2 === 1;

  return (
    <Reveal className={`${glass} overflow-hidden`}>
      <div
        className={`grid gap-0 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}
      >
        <div className="p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
              {project.domain}
            </span>
            {project.gradeBadge ? (
              <span className="rounded-full border border-sky-300/40 bg-sky-400/10 px-2.5 py-1 text-[11px] font-semibold text-sky-800 dark:text-sky-200">
                {project.gradeBadge}
              </span>
            ) : null}
            {project.awardBadge ? (
              <span className="rounded-full border border-amber-300/40 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold text-amber-800 dark:text-amber-200">
                {project.awardBadge}
              </span>
            ) : null}
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-[1.7rem]">
            {project.title}
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-teal-800 dark:text-teal-200">
            {project.highlight}
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {project.role}
            {project.organization ? ` | ${project.organization}` : ""} |{" "}
            {project.timeline}
          </p>

          <div className="mt-4">
            <TechStack tags={project.techStack} />
          </div>

          {project.dissertationTitle ? (
            <p className="mt-4 text-sm italic leading-relaxed text-zinc-700 dark:text-zinc-200">
              {project.dissertationTitle}
            </p>
          ) : null}

          <ul className="mt-4 space-y-2">
            {project.overview.map((item) => (
              <li
                key={item}
                className="border-l-2 border-teal-600/40 pl-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>

          <EngineeringLog project={project} />

          {project.dissertationCta ? (
            <a
              href={site.cvUrl}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 underline-offset-4 hover:underline dark:text-teal-300"
            >
              {project.dissertationCta}
              <ArrowUpRight size={14} weight="bold" />
            </a>
          ) : null}
        </div>

        <div className="grid gap-3 border-t border-white/10 bg-zinc-950/[0.03] p-4 dark:bg-white/[0.02] sm:grid-cols-2 lg:border-t-0 lg:border-l lg:border-white/10 lg:p-5">
          {project.mediaGuides.map((guide, idx) => (
            <MediaSlot
              key={`${project.id}-${idx}`}
              slotId={`project-${project.id}-${idx}`}
              alt={`${project.title} media ${idx + 1}`}
              guideline={guide}
              frameClassName="h-40 w-full rounded-2xl sm:h-44"
            />
          ))}
          <p className="text-xs text-zinc-500 sm:col-span-2">
            {project.mediaNote}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectsPage() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured.id);

  return (
    <section className="space-y-10">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {projectsSection.eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
              {projectsSection.heading}
            </h1>
            <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {projectsSection.lead}
            </p>
          </div>
          <div className={`${glass} hidden items-center gap-3 px-4 py-3 md:flex`}>
            <Cpu size={22} weight="duotone" className="text-teal-600 dark:text-teal-300" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Focus track
              </p>
              <p className="text-sm font-semibold">EEE · Build & Prove</p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {projectsSection.capabilities.map((cap, i) => (
          <Reveal key={cap.label} delay={i * 0.04} className={`${glass} p-4`}>
            <div className="mb-2 flex items-center gap-2 text-teal-700 dark:text-teal-300">
              {i === 3 ? (
                <Flask size={18} weight="duotone" />
              ) : (
                <Circuitry size={18} weight="duotone" />
              )}
              <p className="text-sm font-semibold tracking-tight">{cap.label}</p>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {cap.detail}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="space-y-6">
        <FeaturedCase project={featured} />
        {rest.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
