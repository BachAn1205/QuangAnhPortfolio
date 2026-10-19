"use client";

import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { TopChrome } from "@/components/layout/TopChrome";
import { CopyEmailButton } from "@/components/shared/CopyEmailButton";
import { MediaSlot } from "@/components/shared/MediaSlot";
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
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const glass =
  "rounded-3xl border border-white/20 bg-white/55 shadow-[0_30px_80px_-28px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]";

export function VelixoTheme() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-zinc-100 text-zinc-900 dark:bg-[#070b12] dark:text-zinc-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] opacity-0 dark:opacity-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.12),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.1),transparent_40%)]" />
        <div
          className="absolute inset-0 opacity-[0.18] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <TopChrome variant="velixo" />

      <main id="top" className="mx-auto max-w-[1400px] px-4 pb-20 pt-8 md:px-6">
        <section className="grid items-stretch gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className={`${glass} p-7 md:p-10`}>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {hero.tagline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={hero.ctaPrimaryHref}
                className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(13,148,136,0.9)] hover:bg-teal-500 active:scale-[0.98]"
              >
                {hero.ctaPrimary}
                <ArrowDown size={16} weight="bold" />
              </a>
              <a
                href={hero.ctaSecondaryHref}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/30 px-4 py-2.5 text-sm font-semibold backdrop-blur dark:border-white/15 dark:bg-white/5"
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

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {hero.metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.04} className={`${glass} p-4`}>
              <p className="text-lg font-semibold tracking-tight">{metric.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {metric.detail}
              </p>
            </Reveal>
          ))}
        </div>

        <section id="about" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {about.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {about.heading}
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
              {about.images.map((image, idx) => (
                <Reveal
                  key={image.guideline}
                  className={`${glass} group overflow-hidden p-3 ${idx === 0 ? "sm:col-span-2" : ""}`}
                >
                  <MediaSlot
                    slotId={`about-${idx}`}
                    alt={image.alt}
                    guideline={image.guideline}
                    frameClassName={`w-full rounded-xl ${idx === 0 ? "h-56" : "h-44"}`}
                  />
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {image.caption}
                  </p>
                </Reveal>
              ))}
              <Reveal className={`${glass} p-5 sm:col-span-2`}>
                <p className="text-sm font-semibold">Quick Facts</p>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {about.quickFacts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal className={`${glass} p-7 lg:col-span-7`}>
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {projectsSection.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {projectsSection.heading}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 0.04} className={`${glass} p-6 md:p-8`}>
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.awardBadge ? (
                    <span className="rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-800 dark:text-amber-200">
                      {project.awardBadge}
                    </span>
                  ) : null}
                  {project.gradeBadge ? (
                    <span className="rounded-full border border-sky-300/40 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold text-sky-800 dark:text-sky-200">
                      {project.gradeBadge}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {project.role}
                  {project.organization ? ` | ${project.organization}` : ""} |{" "}
                  {project.timeline}
                </p>
                <div className="mt-5">
                  <ProjectDetails project={project} variant="velixo" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="leadership" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {leadership.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {leadership.heading}
            </h2>
          </Reveal>

          <Reveal className={`${glass} mt-8 p-6 md:p-8`}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
              Featured Venture Spotlight
            </p>
            <h3 className="mt-2 text-3xl font-semibold">
              {leadership.featured.title}
            </h3>
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

        <section id="broadcasting" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {broadcasting.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {broadcasting.heading}
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Reveal className={`${glass} p-6`}>
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
            <Reveal className={`${glass} p-6`}>
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

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {broadcasting.videos.map((video) => (
              <Reveal key={video.youtubeId} className={`${glass} overflow-hidden p-4`}>
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

        <section id="credentials" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              {credentials.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {credentials.heading}
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <Reveal className={`${glass} p-6`}>
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
            <Reveal className={`${glass} p-6`}>
              <h3 className="font-semibold">Honors & Awards</h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {credentials.honors.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className={`${glass} p-6`}>
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
        className="border-t border-white/10 bg-zinc-950/90 text-zinc-100 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-12 md:flex-row md:items-end md:justify-between md:px-6">
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
            <CopyEmailButton className="border-white/15 bg-white/10 text-zinc-100 hover:bg-white/15" />
            <a href={site.linkedIn} className="text-sm font-medium text-teal-300">
              {footer.linkedIn}
            </a>
            <a href={site.github} className="text-sm font-medium text-teal-300">
              {footer.github}
            </a>
            <a
              href={site.cvUrl}
              className="rounded-xl bg-teal-500 px-3 py-2 text-sm font-semibold text-zinc-950"
            >
              {footer.resume}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
