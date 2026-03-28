import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Tell us about your business and the manual work slowing you down. We'll show you exactly how AI can fix it.",
  openGraph: {
    title: "Book a Call | Cogenly",
    description:
      "Tell us about your business and the manual work slowing you down. We'll show you exactly how AI can fix it.",
  },
};

export default function BookACallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
