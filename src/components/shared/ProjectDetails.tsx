"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import type { Project } from "@/data/content";
import { MediaSlot } from "@/components/shared/MediaSlot";

export function ProjectDetails({
  project,
  variant,
}: {
  project: Project;
  variant: "gridly" | "velixo" | "benbox";
}) {
  const [open, setOpen] = useState(false);

  const panel =
    variant === "velixo"
      ? "rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md dark:bg-white/5"
      : variant === "gridly"
        ? "rounded-3xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-white/10 dark:bg-zinc-900/60"
        : "rounded-none border border-zinc-300 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-900";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tag) => (
          <span
            key={tag}
            className={
              variant === "benbox"
                ? "border border-zinc-400 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-700 dark:border-zinc-500 dark:text-zinc-200"
                : "rounded-full bg-teal-700/10 px-2.5 py-1 text-[11px] font-medium text-teal-800 dark:bg-teal-400/15 dark:text-teal-200"
            }
          >
            {tag}
          </span>
        ))}
      </div>

      <ul className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {project.overview.map((item) => (
          <li key={item} className="pl-3 border-l-2 border-teal-600/40">
            {item}
          </li>
        ))}
      </ul>

      {project.dissertationTitle ? (
        <p className="text-sm italic leading-relaxed text-zinc-700 dark:text-zinc-200">
          {project.dissertationTitle}
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 dark:text-teal-300"
      >
        Behind the Scenes: Engineering Log
        <CaretDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className={`qa-log ${panel}`}>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
            {project.behindTheScenes}
          </p>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {project.mediaGuides.map((guide, idx) => (
          <MediaSlot
            key={`${project.id}-media-${idx}`}
            slotId={`project-${project.id}-${idx}`}
            alt={`${project.title} media ${idx + 1}`}
            guideline={guide}
            frameClassName={
              variant === "benbox"
                ? "h-40 w-full border border-zinc-300 dark:border-zinc-600"
                : "h-40 w-full rounded-2xl"
            }
          />
        ))}
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {project.mediaNote}
      </p>
    </div>
  );
}
