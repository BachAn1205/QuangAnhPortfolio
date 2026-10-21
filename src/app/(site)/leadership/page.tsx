import type { Metadata } from "next";
import { LeadershipPage } from "@/components/velixo/LeadershipPage";

export const metadata: Metadata = {
  title: "Venture & Leadership | Quang Anh",
  description: "Venture creation, FlexAid, and community leadership.",
};

export default function Page() {
  return <LeadershipPage />;
}
