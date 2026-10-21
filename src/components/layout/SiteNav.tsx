"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownloadSimple } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { site } from "@/data/content";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/55 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/40 dark:border-white/10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="shrink-0 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-base"
          >
            {site.fullName}
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "bg-teal-600 text-white shadow-[0_10px_30px_-12px_rgba(13,148,136,0.9)] dark:bg-teal-500 dark:text-zinc-950"
                      : "text-teal-800 ring-1 ring-teal-600/30 hover:bg-teal-600/10 dark:text-teal-200 dark:ring-teal-400/30"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
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

        <nav className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? "bg-teal-600 text-white dark:bg-teal-500 dark:text-zinc-950"
                    : "text-teal-800 ring-1 ring-teal-600/30 dark:text-teal-200 dark:ring-teal-400/30"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
