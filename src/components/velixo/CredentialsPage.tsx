"use client";

import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import { credentials } from "@/data/content";

export function CredentialsPage() {
  return (
    <section>
      <Reveal>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          {credentials.heading}
        </h1>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <Reveal className={`${glass} p-6`}>
          <h2 className="font-semibold">Education & External Courses</h2>
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
          <h2 className="font-semibold">Honors & Awards</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            {credentials.honors.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className={`${glass} p-6`}>
          <h2 className="font-semibold">Skills & Interests</h2>
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
  );
}
