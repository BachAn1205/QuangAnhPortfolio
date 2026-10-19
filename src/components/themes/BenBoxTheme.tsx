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
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const box =
  "border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900";

export function BenBoxTheme() {
  return (
    <div className="min-h-[100dvh] bg-[#f7f8f6] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <TopChrome variant="benbox" />

      <main id="top" className="mx-auto max-w-[1400px] px-4 pb-24 pt-10 md:px-8">
        <section className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Reveal>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {hero.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={hero.ctaPrimaryHref}
                className="inline-flex items-center gap-2 border border-zinc-900 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white active:scale-[0.98] dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              >
                {hero.ctaPrimary}
                <ArrowDown size={16} weight="bold" />
              </a>
              <a
                href={hero.ctaSecondaryHref}
                className="inline-flex items-center gap-2 border border-zinc-400 px-4 py-2.5 text-sm font-semibold active:scale-[0.98] dark:border-zinc-500"
              >
                {hero.ctaSecondary}
                <ArrowRight size={16} weight="bold" />
              </a>
            </div>
          </Reveal>

          <Reveal className={`${box} overflow-hidden p-3`}>
            <MediaSlot
              slotId="hero-portrait"
              alt={hero.portraitAlt}
              guideline={hero.portraitGuideline}
              frameClassName="h-full min-h-[340px] w-full"
            />
          </Reveal>
        </section>

        <div className="mt-14 grid gap-px border border-zinc-300 bg-zinc-300 dark:border-zinc-600 dark:bg-zinc-600 sm:grid-cols-2 lg:grid-cols-5">
          {hero.metrics.map((metric) => (
            <Reveal
              key={metric.label}
              className="bg-[#f7f8f6] p-4 dark:bg-zinc-950"
            >
              <p className="text-base font-semibold tracking-tight">
                {metric.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {metric.detail}
              </p>
            </Reveal>
          ))}
        </div>

        <section id="about" className="mt-28 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {about.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {about.heading}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div className="space-y-4">
              {about.images.map((image, idx) => (
                <Reveal key={image.guideline} className={`${box} group p-3`}>
                  <MediaSlot
                    slotId={`about-${idx}`}
                    alt={image.alt}
                    guideline={image.guideline}
                    frameClassName="h-48 w-full"
                  />
                  <p className="mt-2 border-t border-zinc-300 pt-2 text-xs text-zinc-600 dark:border-zinc-600 dark:text-zinc-300">
                    {image.caption}
                  </p>
                </Reveal>
              ))}
              <Reveal className={`${box} p-4`}>
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Quick Facts
                </p>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {about.quickFacts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal className="space-y-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-300 lg:pt-8">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="projects" className="mt-28 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {projectsSection.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {projectsSection.heading}
            </h2>
          </Reveal>

          <div className="mt-12 space-y-16">
            {projects.map((project, i) => (
              <Reveal
                key={project.id}
                className={`grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-14 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className={`${box} p-6 md:p-8`}>
                  <div className="mb-3 space-y-2">
                    {project.awardBadge ? (
                      <p className="text-xs font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">
                        {project.awardBadge}
                      </p>
                    ) : null}
                    {project.gradeBadge ? (
                      <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-300">
                        {project.gradeBadge}
                      </p>
                    ) : null}
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-500">
                    {project.role}
                    {project.organization ? ` | ${project.organization}` : ""} |{" "}
                    {project.timeline}
                  </p>
                  <div className="mt-5">
                    <ProjectDetails project={project} variant="benbox" />
                  </div>
                </div>
                <div className="lg:pt-10">
                  <div className={`${box} p-5`}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Verified Facts
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <li>{project.role}</li>
                      {project.organization ? (
                        <li>{project.organization}</li>
                      ) : null}
                      <li>{project.timeline}</li>
                      {project.awardBadge ? <li>{project.awardBadge}</li> : null}
                      {project.gradeBadge ? <li>{project.gradeBadge}</li> : null}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="leadership" className="mt-28 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {leadership.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {leadership.heading}
            </h2>
          </Reveal>

          <Reveal className={`${box} mt-12 grid gap-0 lg:grid-cols-[3fr_2fr]`}>
            <div className="border-b border-zinc-300 p-6 md:p-8 dark:border-zinc-600 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Featured Venture Spotlight
              </p>
              <h3 className="mt-3 text-3xl font-semibold">
                {leadership.featured.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                {leadership.featured.subtitle}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">
                {leadership.featured.awardBadge}
              </p>
              <p className="mt-4 text-sm text-zinc-500">
                {leadership.featured.role} | {leadership.featured.location} |{" "}
                {leadership.featured.timeline}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {leadership.featured.overview.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                {leadership.featured.reflection}
              </p>
            </div>
            <div className="space-y-3 bg-[#f7f8f6] p-3 dark:bg-zinc-950">
              {leadership.featured.mediaGuides.map((guide, idx) => (
                <MediaSlot
                  key={guide}
                  slotId={`leadership-featured-${idx}`}
                  alt={`${leadership.featured.title} media ${idx + 1}`}
                  guideline={guide}
                  frameClassName="h-36 w-full border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900"
                />
              ))}
            </div>
          </Reveal>
          <p className="mt-2 text-xs text-zinc-500">
            {leadership.featured.mediaNote}
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {[leadership.uk, leadership.vietnam].map((column) => (
              <Reveal key={column.title} className={`${box} p-6`}>
                <h3 className="text-lg font-semibold">{column.title}</h3>
                <div className="mt-5 space-y-6">
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

        <section id="broadcasting" className="mt-28 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {broadcasting.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {broadcasting.heading}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <Reveal className={`${box} p-6`}>
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
            <Reveal className={`${box} p-6`}>
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

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {broadcasting.videos.map((video) => (
              <Reveal key={video.youtubeId} className={`${box} p-4`}>
                <div className="mb-3 flex items-center justify-between gap-2 border-b border-zinc-300 pb-3 dark:border-zinc-600">
                  <p className="text-sm font-semibold">{video.title}</p>
                  <span className="border border-zinc-400 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
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

        <section id="credentials" className="mt-28 scroll-mt-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {credentials.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {credentials.heading}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px border border-zinc-300 bg-zinc-300 dark:border-zinc-600 dark:bg-zinc-600 lg:grid-cols-3">
            <Reveal className="bg-[#f7f8f6] p-6 dark:bg-zinc-950">
              <h3 className="font-semibold uppercase tracking-wide">
                Education & External Courses
              </h3>
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
            <Reveal className="bg-[#f7f8f6] p-6 dark:bg-zinc-950">
              <h3 className="font-semibold uppercase tracking-wide">
                Honors & Awards
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {credentials.honors.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="bg-[#f7f8f6] p-6 dark:bg-zinc-950">
              <h3 className="font-semibold uppercase tracking-wide">
                Skills & Interests
              </h3>
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
        className="border-t border-zinc-800 bg-zinc-950 text-zinc-100"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[3fr_2fr] md:px-8">
          <div>
            <p className="text-lg font-semibold">{site.fullName}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
              {footer.closing}
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <p>
              {footer.locationLabel}: {site.location}
            </p>
            <p>
              {footer.emailLabel}: {site.email}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <CopyEmailButton className="border-zinc-600 bg-transparent text-zinc-100 hover:bg-white/5" />
              <a href={site.linkedIn} className="underline underline-offset-4">
                {footer.linkedIn}
              </a>
              <a href={site.github} className="underline underline-offset-4">
                {footer.github}
              </a>
              <a
                href={site.cvUrl}
                className="border border-zinc-100 px-3 py-2 font-semibold text-zinc-100"
              >
                {footer.resume}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
