import { CopyEmailButton } from "@/components/shared/CopyEmailButton";
import { footer, site } from "@/data/content";

export function SiteFooter() {
  return (
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
  );
}
