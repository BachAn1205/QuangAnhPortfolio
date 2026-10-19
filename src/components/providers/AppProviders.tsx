"use client";

import { ThemeProvider } from "next-themes";
import { StyleTabProvider } from "@/components/providers/StyleTabProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <StyleTabProvider>{children}</StyleTabProvider>
    </ThemeProvider>
  );
}
