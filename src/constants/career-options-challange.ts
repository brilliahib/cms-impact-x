export type CareerChallengeCategory =
  | "Problem Solving"
  | "Innovation"
  | "Data-driven"
  | "Communication";

export interface CareerOption {
  value: CareerChallengeCategory;
  label: string;
  desc: string;
}

export const careerOptionsChallenge = [
  {
    value: "Problem Solving",
    label: "Problem Solving",
    desc: "I like finding solutions to tough problems.",
  },
  {
    value: "Innovation",
    label: "Innovation",
    desc: "I enjoy creating new ideas or products.",
  },
  {
    value: "Data-driven",
    label: "Data-driven",
    desc: "I make decisions based on facts and data.",
  },
  {
    value: "Communication",
    label: "Communication",
    desc: "I love expressing and sharing ideas effectively.",
  },
];
