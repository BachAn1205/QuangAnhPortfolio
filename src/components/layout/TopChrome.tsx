"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useStyleTab } from "@/components/providers/StyleTabProvider";
import { site, styleTabs } from "@/data/content";

type TopChromeProps = {
  variant: "gridly" | "velixo" | "benbox";
};

export function TopChrome({ variant }: TopChromeProps) {
  const { styleTab, setStyleTab } = useStyleTab();

  const shell =
    variant === "velixo"
      ? "sticky top-0 z-40 border-b border-white/10 bg-zinc-950/55 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/40 dark:border-white/10"
      : variant === "gridly"
        ? "sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/75"
        : "sticky top-0 z-40 border-b border-zinc-300 bg-white/95 dark:border-zinc-700 dark:bg-zinc-950/95";

  const tabBase =
    variant === "benbox"
      ? "rounded-none border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide"
      : "rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide";

  return (
    <header className={shell}>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="shrink-0 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-base"
          >
            {site.fullName}
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-4 lg:flex">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm text-zinc-600 transition hover:text-teal-700 dark:text-zinc-300 dark:hover:text-teal-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <a
              href={site.cvUrl}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-600 active:scale-[0.98] dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400 md:text-sm"
            >
              <DownloadSimple size={16} weight="bold" />
              <span className="hidden sm:inline">{site.ctaDownload}</span>
              <span className="sm:hidden">CV</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            Interface
          </span>
          {styleTabs.map((tab) => {
            const active = styleTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStyleTab(tab.id)}
                className={`${tabBase} transition active:scale-[0.98] ${
                  active
                    ? variant === "benbox"
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "bg-zinc-900 text-white shadow-sm dark:bg-teal-500 dark:text-zinc-950"
                    : variant === "benbox"
                      ? "border-zinc-300 bg-transparent text-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-white/15"
                }`}
              >
                {active ? (
                  <motion.span layoutId="active-style-tab" className="block">
                    {tab.label}
                  </motion.span>
                ) : (
                  tab.label
                )}
              </button>
            );
          })}
        </div>

        <nav className="flex gap-3 overflow-x-auto pb-1 text-xs text-zinc-600 dark:text-zinc-300 lg:hidden">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
