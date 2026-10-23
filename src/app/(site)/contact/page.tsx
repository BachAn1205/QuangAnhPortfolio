import type { Metadata } from "next";
import { ContactPage } from "@/components/velixo/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Quang Anh",
  description:
    "Contact Nguyen Quang Anh in Northampton, UK and Hanoi, Vietnam.",
};

export default function Page() {
  return <ContactPage />;
}
