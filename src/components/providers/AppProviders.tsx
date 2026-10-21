"use client";

import { ThemeProvider } from "next-themes";
import { MediaProvider } from "@/lib/media-context";
import { ReviewFeedbackSystem } from "@holyann/web-text-review";

export function AppProviders({
  children,
  initialMedia,
}: {
  children: React.ReactNode;
  initialMedia?: Record<string, string>;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MediaProvider initialMedia={initialMedia}>
        {children}
        <ReviewFeedbackSystem
          config={{
            projectName: "Quang Anh Portfolio Review Hub",
            apiPath: "/api/reviews",
            storageKey: "quanganh_reviewer_name",
            primaryColor: "#0F766E",
            accentColor: "#B45309",
            enabled: process.env.NEXT_PUBLIC_ENABLE_REVIEW !== "false",
          }}
        />
      </MediaProvider>
    </ThemeProvider>
  );
}
