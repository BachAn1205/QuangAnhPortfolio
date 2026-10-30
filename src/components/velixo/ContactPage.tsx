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

      <Reveal className={`${glass} mt-8 grid items-center gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-6`}>
        <MediaSlot
          slotId="contact-portrait"
          alt={contact.photoAlt}
          guideline={contact.photoGuideline}
          frameClassName="h-72 w-full rounded-xl"
          fitContent
        />
        <div className="min-w-0 px-2 py-2 md:pr-4">
          <p className="text-2xl font-semibold tracking-tight">{contact.name}</p>
          <ul className="mt-6 grid gap-x-8">
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
        </div>
      </Reveal>
    </section>
  );
}
