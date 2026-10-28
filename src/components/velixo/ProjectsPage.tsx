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
    <div className="mt-6 grid gap-6 md:grid-cols-3 md:divide-x md:divide-zinc-300/70 dark:md:divide-white/10">
      <section className="md:pr-6">
        <SectionTitle>Overview</SectionTitle>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {project.overview.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="md:px-6">
        <SectionTitle>Process</SectionTitle>
        <ProcessFlow steps={project.process} />
      </section>

      <section className="md:pl-6">
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
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
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

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <Reveal className={`${glass} p-6 md:p-8`}>
      {featured && project.awardBadge ? (
        <p className="text-sm font-semibold text-teal-800 dark:text-teal-200">
          {project.awardBadge}
        </p>
      ) : null}

      <h2
        className={
          featured
            ? "mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
            : "text-2xl font-semibold tracking-tight md:text-[1.7rem]"
        }
      >
        {project.title}
      </h2>
      <p
        className={
          featured
            ? "mt-3 max-w-[48ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300"
            : "mt-2 text-sm font-medium leading-relaxed text-teal-800 dark:text-teal-200"
        }
      >
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

      <div
        className={`mt-6 grid gap-3 sm:grid-cols-2 ${
          project.mediaGuides.length > 2 ? "lg:grid-cols-3" : ""
        }`}
      >
        {project.mediaGuides.map((guide, idx) => (
          <MediaSlot
            key={`${project.id}-${idx}`}
            slotId={`project-${project.id}-${idx}`}
            alt={`${project.title} media ${idx + 1}`}
            guideline={guide}
            frameClassName="h-44 w-full rounded-2xl"
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500">{project.mediaNote}</p>
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
        <ProjectCard project={featured} featured />
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
