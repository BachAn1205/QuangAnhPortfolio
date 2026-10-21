import type { Metadata } from "next";
import { AboutPage } from "@/components/velixo/AboutPage";

export const metadata: Metadata = {
  title: "About | Quang Anh",
  description: "Bridging the lab bench and the real world.",
};

export default function Page() {
  return <AboutPage />;
}
