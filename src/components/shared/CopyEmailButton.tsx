"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";
import { footer, site } from "@/data/content";

export function CopyEmailButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition active:scale-[0.98] ${className}`}
    >
      {copied ? <Check size={16} weight="bold" /> : <Copy size={16} weight="bold" />}
      {copied ? footer.copied : footer.copyEmail}
    </button>
  );
}
