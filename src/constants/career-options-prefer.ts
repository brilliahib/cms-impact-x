export type CareerPreferCategory =
  | "Collaborative"
  | "Independent"
  | "environment"
  | "Research-oriented"
  | "Leadership";

export interface CareerPreferOption {
  value: CareerPreferCategory;
  label: string;
  desc: string;
}

export const careerOptionsPrefer: CareerPreferOption[] = [
  { value: "Collaborative", label: "Collaborative", desc: "blablubla" },
  { value: "Independent", label: "Independent", desc: "blablubla" },
  {
    value: "environment",
    label: "Environment & Sustainability",
    desc: "blablubla",
  },
  { value: "Research-oriented", label: "Research-oriented", desc: "blablubla" },
  { value: "Leadership", label: "Leadership", desc: "blablubla" },
];
