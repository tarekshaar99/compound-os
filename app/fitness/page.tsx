import type { Metadata } from "next";
import PillarIndex from "../components/module/PillarIndex";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fitness",
  description:
    "The hybrid athlete system: strength, Zone 2, intervals, mobility, and recovery. The Fitness pillar of Compound OS.",
  openGraph: {
    title: "Fitness | Compound OS",
    description:
      "The hybrid athlete system: strength, Zone 2, intervals, mobility, and recovery.",
  },
};

export default function FitnessPage() {
  return <PillarIndex pillar="fitness" />;
}
