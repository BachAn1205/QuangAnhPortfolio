import type { Metadata } from "next";
import { CredentialsPage } from "@/components/velixo/CredentialsPage";

export const metadata: Metadata = {
  title: "Credentials | Quang Anh",
  description: "Education, honors, and technical skills.",
};

export default function Page() {
  return <CredentialsPage />;
}
