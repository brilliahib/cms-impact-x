export interface SkillOption {
  value: string;
  label: string;
}

export type HardSkillCategory =
  | "technology"
  | "health"
  | "environment"
  | "social"
  | "arts"
  | "business"
  | "science";

export const HardSkill: Record<HardSkillCategory, SkillOption[]> = {
  technology: [
    { value: "Programming", label: "Programming" },
    { value: "Data Analysis", label: "Data Analysis" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Database", label: "Database" },
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Cloud Computing", label: "Cloud Computing" },
  ],

  health: [
    { value: "Biotechnology", label: "Biotechnology" },
    { value: "Medical Research", label: "Medical Research" },
    { value: "Pharmacy", label: "Pharmacy" },
  ],

  environment: [
    { value: "Sustainability", label: "Sustainability" },
    { value: "Renewable Energy", label: "Renewable Energy" },
    { value: "Environmental Engineering", label: "Environmental Engineering" },
  ],

  social: [
    { value: "Community Development", label: "Community Development" },
    { value: "Policy Analysis", label: "Policy Analysis" },
    { value: "Advocacy", label: "Advocacy" },
  ],

  arts: [
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Illustration", label: "Illustration" },
    { value: "Video Editing", label: "Video Editing" },
  ],

  business: [
    { value: "Project Management", label: "Project Management" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Finance Basics", label: "Finance Basics" },
  ],

  science: [
    { value: "Research Methodology", label: "Research Methodology" },
    { value: "Scientific Writing", label: "Scientific Writing" },
    { value: "Lab Skills", label: "Lab Skills" },
  ],
};
