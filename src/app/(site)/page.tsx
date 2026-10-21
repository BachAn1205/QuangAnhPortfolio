import type { Metadata } from "next";
import { HomeHero } from "@/components/velixo/HomeHero";

export const metadata: Metadata = {
  title: "Quang Anh | Engineering & Entrepreneurship Portfolio",
  description:
    "Embedded systems maker, tech entrepreneur, and community leader based between Northampton, UK and Hanoi, Vietnam.",
};

export default function HomePage() {
  return <HomeHero />;
}
