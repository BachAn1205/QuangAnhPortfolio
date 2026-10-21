import { VelixoShell } from "@/components/velixo/VelixoShell";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VelixoShell>{children}</VelixoShell>;
}
