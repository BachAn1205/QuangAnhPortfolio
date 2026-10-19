"use client";

import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { TopChrome } from "@/components/layout/TopChrome";
import { CopyEmailButton } from "@/components/shared/CopyEmailButton";
import { ProjectDetails } from "@/components/shared/ProjectDetails";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import {
  about,
  broadcasting,
  credentials,
  footer,
  hero,
  leadership,
  projects,
  projectsSection,
  site,
} from "@/data/content";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const tile =
  "rounded-[28px] border border-zinc-200/80 bg-white/80 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset] dark:border-white/10 dark:bg-zinc-900/70 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]";

export function GridlyTheme() {
  return (
    <div className="min-h-[100dvh] bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <TopChrome variant="gridly" />

      <main id="top" className="mx-auto max-w-[1400px] px-4 pb-20 pt-6 md:px-6">
        <section className="grid gap-4 md:grid-cols-5">
          <Reveal className={`${tile} p-6 md:col-span-3 md:p-8`}>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {hero.tagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={hero.ctaPrimaryHref}
                className="inline-flex items-center gap-2 rounded-2xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 active:scale-[0.98] dark:bg-teal-500 dark:text-zinc-950"
              >
                {hero.ctaPrimary}
                <ArrowDown size={16} weight="bold" />
              </a>
              <a
                href={hero.ctaSecondaryHref}
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 active:scale-[0.98] dark:border-white/15 dark:text-zinc-100 dark:hover:bg-white/5"
              >
                {hero.ctaSecondary}
                <ArrowRight size={16} weight="bold" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className={`${tile} overflow-hidden md:col-span-2`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.portraitSrc}
              alt={hero.portraitAlt}
              className="h-full min-h-[320px] w-full object-cover"
            />
          </Reveal>
        </section>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {hero.metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.04} className={`${tile} p-4`}>
              <p className="text-lg font-semibold tracking-tight">{metric.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {metric.detail}
              </p>
            </Reveal>
          ))}
        </div>

        <section id="about" className="mt-16 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {about.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {about.heading}
            </h2>
          </Reveal>

          <div className="mt-6 grid gap-4 lg:grid-cols-12">
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
              {about.images.map((image, idx) => (
                <Reveal
                  key={image.src}
                  className={`${tile} group relative overflow-hidden ${idx === 0 ? "sm:col-span-2" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${idx === 0 ? "h-56" : "h-44"}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/80 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                    <p className="text-xs text-white">{image.caption}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal className={`${tile} p-4 sm:col-span-2`}>
                <p className="text-sm font-semibold">Quick Facts</p>
                <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {about.quickFacts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal className={`${tile} p-6 lg:col-span-7 md:p-8`}>
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="mt-16 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {projectsSection.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {projectsSection.heading}
            </h2>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal
                key={project.id}
                delay={(i % 2) * 0.05}
                className={`${tile} p-5 md:p-6 ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.awardBadge ? (
                    <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-800 dark:text-amber-200">
                      {project.awardBadge}
                    </span>
                  ) : null}
                  {project.gradeBadge ? (
                    <span className="rounded-full bg-sky-500/15 px-2.5 py-1 text-[11px] font-semibold text-sky-800 dark:text-sky-200">
                      {project.gradeBadge}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {project.role}
                  {project.organization ? ` | ${project.organization}` : ""} |{" "}
                  {project.timeline}
                </p>
                <div className="mt-4">
                  <ProjectDetails project={project} variant="gridly" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="leadership" className="mt-16 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {leadership.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {leadership.heading}
            </h2>
          </Reveal>

          <Reveal className={`${tile} mt-6 overflow-hidden`}>
            <div className="grid gap-0 lg:grid-cols-5">
              <div className="bg-gradient-to-br from-teal-700 to-sky-800 p-6 text-white lg:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-wide opacity-80">
                  Featured Venture Spotlight
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  {leadership.featured.title}
                </h3>
                <p className="mt-1 text-sm opacity-90">
                  {leadership.featured.subtitle}
                </p>
                <p className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {leadership.featured.awardBadge}
                </p>
              </div>
              <div className="p-6 lg:col-span-3">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
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
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {leadership.featured.imageSeeds.map((seed) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={seed}
                      src={`https://picsum.photos/seed/${seed}/480/320`}
                      alt={`${leadership.featured.title} media`}
                      className="h-28 w-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  {leadership.featured.mediaNote}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {[leadership.uk, leadership.vietnam].map((column) => (
              <Reveal key={column.title} className={`${tile} p-5 md:p-6`}>
                <h3 className="text-lg font-semibold">{column.title}</h3>
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
              </Reveal>
            ))}
          </div>
        </section>

        <section id="broadcasting" className="mt-16 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {broadcasting.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {broadcasting.heading}
            </h2>
          </Reveal>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Reveal className={`${tile} p-5 md:p-6`}>
              <h3 className="text-xl font-semibold">
                {`Channel 1: "${broadcasting.online.name}" YouTube Channel`}
              </h3>
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

            <Reveal className={`${tile} p-5 md:p-6`}>
              <h3 className="text-xl font-semibold">
                {`Channel 2: "${broadcasting.onlive.name}" YouTube Channel`}
              </h3>
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

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {broadcasting.videos.map((video) => (
              <Reveal key={video.youtubeId} className={`${tile} overflow-hidden p-4`}>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{video.title}</p>
                  <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
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

        <section id="credentials" className="mt-16 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {credentials.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {credentials.heading}
            </h2>
          </Reveal>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Reveal className={`${tile} p-5`}>
              <h3 className="font-semibold">Education & External Courses</h3>
              <div className="mt-4 space-y-4">
                {credentials.education.map((ed) => (
                  <div key={ed.school}>
                    <p className="text-sm font-semibold">{ed.school}</p>
                    <p className="text-xs text-zinc-500">{ed.timeline}</p>
                    <ul className="mt-1 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {ed.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {credentials.externalCourses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className={`${tile} p-5`}>
              <h3 className="font-semibold">Honors & Awards</h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {credentials.honors.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal className={`${tile} p-5`}>
              <h3 className="font-semibold">Skills & Interests</h3>
              <div className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <p>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                    Hard Skills:{" "}
                  </span>
                  {credentials.hardSkills}
                </p>
                <p>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                    Soft Skills:{" "}
                  </span>
                  {credentials.softSkills}
                </p>
                <p>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                    Interests & Affiliations:{" "}
                  </span>
                  {credentials.interests}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="border-t border-zinc-200 bg-zinc-950 text-zinc-100 dark:border-white/10"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-12 md:px-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-lg font-semibold">{site.fullName}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              {footer.closing}
            </p>
            <p className="mt-4 text-sm text-zinc-400">
              {footer.locationLabel}: {site.location}
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              {footer.emailLabel}: {site.email}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CopyEmailButton className="border-white/15 bg-white/5 text-zinc-100 hover:bg-white/10" />
            <a
              href={site.linkedIn}
              className="text-sm font-medium text-teal-300 hover:text-teal-200"
            >
              {footer.linkedIn}
            </a>
            <a
              href={site.github}
              className="text-sm font-medium text-teal-300 hover:text-teal-200"
            >
              {footer.github}
            </a>
            <a
              href={site.cvUrl}
              className="rounded-xl bg-teal-500 px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-teal-400"
            >
              {footer.resume}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
