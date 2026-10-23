import Link from "next/link";
import { VelixoShell } from "@/components/velixo/VelixoShell";

export default function NotFound() {
  return (
    <VelixoShell>
      <div className="max-w-xl py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          This address is not part of the portfolio.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 dark:bg-teal-500 dark:text-zinc-950"
        >
          Back to home
        </Link>
      </div>
    </VelixoShell>
  );
}
