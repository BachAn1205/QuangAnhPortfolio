"use client";

import {
  EnvelopeSimple,
  GithubLogo,
  Globe,
  MapPin,
  Phone,
} from "@phosphor-icons/react";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { Reveal } from "@/components/velixo/Reveal";
import { glass } from "@/components/velixo/styles";
import { contact, site } from "@/data/content";

const linkClass =
  "text-sm font-medium text-teal-800 underline-offset-4 hover:underline dark:text-teal-200";

export function ContactPage() {
  return (
    <section>
      <Reveal>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          {contact.heading}
        </h1>
      </Reveal>

      <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className={`${glass} p-7 md:p-8`}>
          <p className="text-2xl font-semibold tracking-tight">{contact.name}</p>
          <ul className="mt-6 divide-y divide-zinc-300/70 dark:divide-white/10">
            {contact.places.map((place) => (
              <li key={place} className="flex items-center gap-3 py-3">
                <MapPin
                  size={18}
                  weight="duotone"
                  className="shrink-0 text-teal-700 dark:text-teal-300"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-200">
                  {place}
                </span>
              </li>
            ))}
            <li className="flex items-center gap-3 py-3">
              <EnvelopeSimple
                size={18}
                weight="duotone"
                className="shrink-0 text-teal-700 dark:text-teal-300"
              />
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3 py-3">
              <Phone
                size={18}
                weight="duotone"
                className="shrink-0 text-teal-700 dark:text-teal-300"
              />
              <a href={site.phoneHref} className={linkClass}>
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 py-3">
              <GithubLogo
                size={18}
                weight="duotone"
                className="shrink-0 text-teal-700 dark:text-teal-300"
              />
              <a
                href={site.github}
                className={linkClass}
                target="_blank"
                rel="noreferrer"
              >
                {contact.githubLabel}
              </a>
            </li>
            <li className="flex items-center gap-3 py-3">
              <Globe
                size={18}
                weight="duotone"
                className="shrink-0 text-teal-700 dark:text-teal-300"
              />
              <a href={contact.websiteHref} className={linkClass}>
                {contact.websiteLabel}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal
          delay={0.08}
          className={`${glass} flex h-full min-h-0 flex-col overflow-hidden p-3`}
        >
          <MediaSlot
            slotId="contact-portrait"
            alt={contact.photoAlt}
            guideline={contact.photoGuideline}
            className="min-h-0 flex-1"
            frameClassName="min-h-[16rem] w-full flex-1 rounded-xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
