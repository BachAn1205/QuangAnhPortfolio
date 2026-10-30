import type { Metadata } from "next";
import { ProjectsPage } from "@/components/velixo/ProjectsPage";

export const metadata: Metadata = {
  title: "Engineering & Experience | Quang Anh",
  description: "Hardware, software, and scientific investigation projects.",
};

export default function Page() {
  return <ProjectsPage />;
}
