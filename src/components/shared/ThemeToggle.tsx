"use client";

import { MoonStars, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle color mode"
        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300/70 bg-white/60 dark:border-white/10 dark:bg-white/5 ${className}`}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300/70 bg-white/70 text-zinc-800 transition hover:bg-white active:scale-[0.98] dark:border-white/10 dark:bg-white/10 dark:text-zinc-100 dark:hover:bg-white/15 ${className}`}
    >
      {isDark ? (
        <Sun size={18} weight="duotone" />
      ) : (
        <MoonStars size={18} weight="duotone" />
      )}
    </button>
  );
}
