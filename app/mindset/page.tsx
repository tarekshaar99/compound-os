import type { Metadata } from "next";
import PillarIndex from "../components/module/PillarIndex";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mindset",
  description:
    "Identity, emotional regulation, discipline, and decision-making under pressure. The Mindset pillar of Compound OS.",
  openGraph: {
    title: "Mindset | Compound OS",
    description:
      "Identity, emotional regulation, discipline, and decision-making under pressure.",
  },
};

export default function MindsetPage() {
  return <PillarIndex pillar="mindset" />;
}
