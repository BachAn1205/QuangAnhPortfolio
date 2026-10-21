import type { Metadata } from "next";
import { BroadcastingPage } from "@/components/velixo/BroadcastingPage";

export const metadata: Metadata = {
  title: "Broadcasting | Quang Anh",
  description: "Sports tactical analysis and live broadcasting.",
};

export default function Page() {
  return <BroadcastingPage />;
}
