"use client";

import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import { broadcasting } from "@/data/content";

export function BroadcastingPage() {
  return (
    <section>
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          {broadcasting.eyebrow}
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          {broadcasting.heading}
        </h1>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal className={`${glass} p-6`}>
          <h2 className="text-xl font-semibold">
            {`Channel 1: "${broadcasting.online.name}" YouTube Channel`}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            {broadcasting.online.role} | {broadcasting.online.location} |{" "}
            {broadcasting.online.timeline}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {broadcasting.online.achievements.map((a) => (
              <li key={a.slice(0, 40)}>{a}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className={`${glass} p-6`}>
          <h2 className="text-xl font-semibold">
            {`Channel 2: "${broadcasting.onlive.name}" YouTube Channel`}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            {broadcasting.onlive.role} | {broadcasting.onlive.location} |{" "}
            {broadcasting.onlive.timeline}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {broadcasting.onlive.achievements.map((a) => (
              <li key={a.slice(0, 40)}>{a}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-200">
            {broadcasting.reflection}
          </p>
        </Reveal>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {broadcasting.videos.map((video) => (
          <Reveal
            key={video.youtubeId}
            className={`${glass} overflow-hidden p-4`}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{video.title}</p>
              <span className="rounded-full border border-rose-300/30 bg-rose-400/10 px-2.5 py-1 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
                {video.badge}
              </span>
            </div>
            <YouTubeEmbed
              youtubeId={video.youtubeId}
              title={video.title}
              start={video.start}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
