"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownloadSimple } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { site } from "@/data/content";

export function SiteNav() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const hiddenRef = useRef(false);
  const [hidden, setHidden] = useState(false);
  const [barHeight, setBarHeight] = useState(0);

  const setNavHidden = (next: boolean) => {
    if (hiddenRef.current === next) return;
    hiddenRef.current = next;
    setHidden(next);
  };

  useEffect(() => {
    hiddenRef.current = false;
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const syncHeight = () => setBarHeight(header.offsetHeight);
    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let acc = 0;

    const onWheel = (event: WheelEvent) => {
      if (window.scrollY < 48) {
        acc = 0;
        setNavHidden(false);
        return;
      }
      if (event.deltaY < 0) {
        acc = 0;
        setNavHidden(false);
      } else if (event.deltaY > 0) {
        setNavHidden(true);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (y < 48) {
        acc = 0;
        setNavHidden(false);
        return;
      }
      acc += delta;
      if (acc <= -4) {
        acc = 0;
        setNavHidden(false);
      } else if (acc >= 24) {
        acc = 0;
        setNavHidden(true);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  return (
    <>
    <header
      ref={headerRef}
      onFocus={() => setNavHidden(false)}
      className={`fixed inset-x-0 top-0 z-40 border-b border-zinc-200/80 bg-zinc-100 transition-transform duration-300 motion-reduce:transition-none dark:border-white/10 dark:bg-[#070b12] ${
        hidden ? "pointer-events-none -translate-y-full" : "translate-y-0"
      }`}
    >
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
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-600 active:scale-[0.98] dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400 md:text-sm"
            >
              <DownloadSimple size={16} weight="bold" />
              <span className="hidden sm:inline">{site.ctaDownload}</span>
              <span className="sm:hidden">CV</span>
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap gap-1.5 lg:hidden">
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
    <div aria-hidden style={{ height: barHeight }} />
    </>
  );
}
