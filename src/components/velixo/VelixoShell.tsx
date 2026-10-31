import { CircuitBackground } from "@/components/shared/CircuitBackground";
import { NextPageLink } from "@/components/layout/NextPageLink";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/velixo/SiteFooter";

export function VelixoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] overflow-x-clip bg-zinc-100 text-zinc-900 dark:bg-[#070b12] dark:text-zinc-50">
      <CircuitBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] opacity-0 dark:opacity-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.12),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(15,118,110,0.16),transparent_42%)]" />
        <div
          className="absolute inset-0 opacity-[0.18] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <a href="#content" className="qa-skip">
        Skip to content
      </a>
      <SiteNav />
      <main
        id="content"
        tabIndex={-1}
        className="mx-auto max-w-[1400px] px-4 pb-28 pt-8 outline-none md:px-6"
      >
        {children}
        <NextPageLink />
      </main>
      <SiteFooter />
    </div>
  );
}
