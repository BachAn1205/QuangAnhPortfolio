"use client";

import { MediaSlot } from "@/components/shared/MediaSlot";
import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import {
  projects,
  projectsSection,
  type Project,
} from "@/data/content";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-teal-800 dark:text-teal-200">
      {children}
    </h3>
  );
}

function CaseBody({ project }: { project: Project }) {
  return (
    <div className="mt-6 divide-y divide-zinc-300/70 dark:divide-white/10">
      <section className="pb-6">
        <SectionTitle>Overview</SectionTitle>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {project.overview.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="py-6">
        <SectionTitle>Process</SectionTitle>
        <ProcessFlow steps={project.process} />
      </section>

      <section className="pt-6">
        <SectionTitle>Behind the scenes</SectionTitle>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {project.behindTheScenes}
        </p>
      </section>
    </div>
  );
}

function ProcessFlow({ steps }: { steps: Project["process"] }) {
  return (
    <div className="@container">
      <ol className="mt-3 grid gap-3 @5xl:grid-cols-5">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative flex gap-3 rounded-2xl border border-teal-700/20 bg-teal-700/5 p-3 dark:border-teal-300/20 dark:bg-teal-400/5 @5xl:flex-col @5xl:gap-2"
          >
            {i < steps.length - 1 ? (
              <span
                aria-hidden
                className="absolute left-[1.3rem] top-full h-3 w-px bg-teal-700/40 dark:bg-teal-300/40 @5xl:left-full @5xl:top-1/2 @5xl:h-px @5xl:w-3"
              />
            ) : null}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 font-mono text-xs font-semibold text-white dark:bg-teal-500 dark:text-zinc-950">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-semibold leading-snug">{step.title}</p>
              {step.detail ? (
                <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {step.detail}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
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
      <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r lg:border-white/10">
          {project.awardBadge ? (
            <p className="text-sm font-semibold text-teal-800 dark:text-teal-200">
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

          <CaseBody project={project} />
          <p className="mt-6 text-xs text-zinc-500">{project.mediaNote}</p>
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
  const stacked = index >= 2;
  const flip = !stacked && index % 2 === 1;

  return (
    <Reveal className={`${glass} overflow-hidden`}>
      <div
        className={
          stacked
            ? "grid"
            : `grid gap-0 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`
        }
      >
        <div className="p-6 md:p-7">
          <h2 className="text-2xl font-semibold tracking-tight md:text-[1.7rem]">
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

          <CaseBody project={project} />
        </div>

        <div
          className={`grid gap-3 border-t border-white/10 bg-zinc-950/[0.03] p-4 dark:bg-white/[0.02] sm:grid-cols-2 ${
            stacked
              ? ""
              : "lg:border-t-0 lg:border-l lg:border-white/10 lg:p-5"
          }`}
        >
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
      <Reveal className="@container">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {projectsSection.heading}
        </h1>
        <p className="mt-3 whitespace-nowrap text-[clamp(0.7rem,1.32cqi,1rem)] leading-normal text-zinc-600 dark:text-zinc-300">
          {projectsSection.lead}
        </p>
      </Reveal>

      <div className="space-y-6">
        <FeaturedCase project={featured} />
        {rest.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
