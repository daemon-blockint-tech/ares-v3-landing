import type { DataPoint } from "@/components/react-bits/simple-graph";

/** Source: ARES V3 whitepaper (public/ares-v3-whitepaper.pdf), abstract & §1.2 — Trident Arena overlap subset (5 protocols, 22 critical/high findings). Values are recall rates (%). */
export const headToHeadRecallPercent: DataPoint[] = [
  { label: "ARES V3", value: 86 },
  { label: "Trident Arena", value: 64 },
  { label: "Opus 4.6", value: 23 },
  { label: "GPT-5.2", value: 18 },
];

/** Segment B production repos — macro- and micro-averaged scores reported in the whitepaper (abstract / K3). Values are rates on a 0–100 scale. */
export const segmentBAggregatePercent: DataPoint[] = [
  { label: "Macro avg precision", value: 79 },
  { label: "Macro avg recall", value: 98 },
  { label: "Micro precision", value: 83 },
  { label: "Micro F1", value: 89 },
];

/** Segment B false-positive totals after deterministic local judge iterations (whitepaper §1.2 K3). Lower is better. */
export const segmentBFalsePositives: DataPoint[] = [
  { label: "Pipeline v15", value: 54 },
  { label: "Pipeline v29", value: 7 },
];

export const WHITEPAPER_SOURCE_LABEL =
  "ARES V3 whitepaper (May 2026), public/ares-v3-whitepaper.pdf";
