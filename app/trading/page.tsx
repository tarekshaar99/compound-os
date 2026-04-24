import type { Metadata } from "next";
import PillarIndex from "../components/module/PillarIndex";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Markets",
  description:
    "Capital preservation, options income, and a rules-based framework for finding good companies. The Markets pillar of Compound OS.",
  openGraph: {
    title: "Markets | Compound OS",
    description:
      "Capital preservation, options income, and a rules-based framework for finding good companies.",
  },
};

export default function TradingPage() {
  return <PillarIndex pillar="trading" />;
}
