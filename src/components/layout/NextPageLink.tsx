"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/content";

export function NextPageLink() {
  const pathname = usePathname();
  const index = site.nav.findIndex((item) => item.href === pathname);
  const next = index >= 0 ? site.nav[index + 1] : undefined;
  if (!next) return null;

  return (
    <div className="mt-16 flex justify-end">
      <Link
        href={next.href}
        className="inline-flex items-center bg-teal-700 py-2.5 pr-8 pl-4 text-sm font-semibold text-white hover:bg-teal-600 dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)",
        }}
      >
        {next.label}
      </Link>
    </div>
  );
}
