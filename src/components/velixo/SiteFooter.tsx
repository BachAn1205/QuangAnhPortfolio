import { CopyEmailButton } from "@/components/shared/CopyEmailButton";
import { footer, site } from "@/data/content";

function hasProfilePath(url: string) {
  try {
    return new URL(url).pathname.replace(/\/+$/, "").length > 0;
  } catch {
    return false;
  }
}

export function SiteFooter() {
  const showLinkedIn = hasProfilePath(site.linkedIn);
  const showGithub = hasProfilePath(site.github);

  return (
    <footer
      id="contact"
      className="border-t border-zinc-200 bg-zinc-100 text-zinc-900 dark:border-white/10 dark:bg-[#070b12] dark:text-zinc-100"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-12 md:flex-row md:items-end md:justify-between md:px-6">
        <div className="max-w-xl">
          <p className="text-lg font-semibold">{site.fullName}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {footer.closing}
          </p>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            {footer.locationLabel}: {site.location}
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {footer.emailLabel}: {site.email}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <CopyEmailButton className="border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-white/15 dark:bg-white/10 dark:text-zinc-100 dark:hover:bg-white/15" />
          {showLinkedIn ? (
            <a
              href={site.linkedIn}
              className="text-sm font-medium text-teal-700 dark:text-teal-300"
            >
              {footer.linkedIn}
            </a>
          ) : null}
          {showGithub ? (
            <a
              href={site.github}
              className="text-sm font-medium text-teal-700 dark:text-teal-300"
            >
              {footer.github}
            </a>
          ) : null}
          <a
            href={site.cvUrl}
            className="rounded-full bg-teal-700 px-3 py-2 text-sm font-semibold text-white dark:bg-teal-500 dark:text-zinc-950"
          >
            {site.ctaDownload}
          </a>
        </div>
      </div>
    </footer>
  );
}
