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
    <div className="mt-6">
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <SectionTitle>Overview</SectionTitle>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.overview.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle>Behind the scenes</SectionTitle>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.behindTheScenes}
          </p>
        </section>
      </div>

      <ProcessFlow
        steps={project.process}
        projectTitle={project.title}
        projectId={project.id}
      />
    </div>
  );
}

function JourneyArrow({
  flip,
  markerId,
}: {
  flip: boolean;
  markerId: string;
}) {
  const curve = flip
    ? "M78 2 C 78 28, 22 10, 22 38"
    : "M22 2 C 22 28, 78 10, 78 38";

  return (
    <div aria-hidden className="text-teal-700 dark:text-teal-400">
      <svg viewBox="0 0 40 56" className="mx-auto my-1 h-14 w-10 sm:hidden">
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
          </marker>
        </defs>
        <path
          d="M20 3 C 33 18, 7 36, 20 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeDasharray="4 4"
          strokeLinecap="round"
          markerEnd={`url(#${markerId})`}
        />
      </svg>
      <div className="relative hidden h-16 sm:block">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d={curve}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="7 6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <svg
          viewBox="0 0 12 12"
          className={`absolute bottom-0 h-3.5 w-3.5 -translate-x-1/2 ${
            flip ? "left-[22%]" : "left-[78%]"
          }`}
        >
          <path d="M6 11 L1 2 H11 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function ProcessFlow({
  steps,
  projectTitle,
  projectId,
}: {
  steps: Project["process"];
  projectTitle: string;
  projectId: string;
}) {
  return (
    <div className="mt-8">
      <SectionTitle>Process</SectionTitle>
      <ol className="mt-4 flex flex-col">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <li key={`${projectId}-${step.title}-${i}`} className="min-w-0">
              <div
                className={`flex w-full flex-col gap-3 sm:w-[calc(50%-2.5rem)] ${
                  isLeft ? "sm:mr-auto" : "sm:ml-auto"
                }`}
              >
                <div className="rounded-2xl border border-teal-700/35 bg-white p-4 dark:border-teal-300/30 dark:bg-zinc-950">
                  <div className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 font-mono text-xs font-semibold text-white shadow-[0_0_0_4px] shadow-teal-700/15 dark:bg-teal-400 dark:text-zinc-950 dark:shadow-teal-400/15">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-sm font-medium leading-snug">
                        {step.title}
                      </p>
                      {step.detail ? (
                        <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {step.detail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                {step.media ? (
                  <MediaSlot
                    slotId={step.media.slotId}
                    alt={`${projectTitle}: ${step.title}`}
                    guideline={step.media.guideline}
                    frameClassName="h-72 w-full rounded-xl"
                  />
                ) : null}
              </div>
              {i < steps.length - 1 ? (
                <JourneyArrow
                  flip={!isLeft}
                  markerId={`${projectId}-road-${i}`}
                />
              ) : null}
            </li>
          );
        })}
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
