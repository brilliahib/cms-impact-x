export interface CareerRoleOption {
  value: string;
  label: string;
}

export type CareerRoleCategory =
  | "technology"
  | "health"
  | "environment"
  | "social"
  | "arts"
  | "business"
  | "science"
  | "other";

// Struktur mirip HardSkill
export const CareerRole: Record<CareerRoleCategory, CareerRoleOption[]> = {
  technology: [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Data Scientist", label: "Data Scientist" },
    { value: "AI Engineer", label: "AI Engineer" },
    { value: "Cloud Architect", label: "Cloud Architect" },
    { value: "Cybersecurity Specialist", label: "Cybersecurity Specialist" },
  ],

  health: [
    { value: "Medical Researcher", label: "Medical Researcher" },
    { value: "Pharmacist", label: "Pharmacist" },
    { value: "Nutritionist", label: "Nutritionist" },
    { value: "Public Health Analyst", label: "Public Health Analyst" },
  ],

  environment: [
    { value: "Environmental Engineer", label: "Environmental Engineer" },
    { value: "Sustainability Consultant", label: "Sustainability Consultant" },
    { value: "Renewable Energy Analyst", label: "Renewable Energy Analyst" },
  ],

  social: [
    { value: "Social Worker", label: "Social Worker" },
    { value: "Policy Analyst", label: "Policy Analyst" },
    { value: "Human Rights Advocate", label: "Human Rights Advocate" },
  ],

  arts: [
    { value: "Graphic Designer", label: "Graphic Designer" },
    { value: "Animator", label: "Animator" },
    { value: "Video Producer", label: "Video Producer" },
    { value: "Creative Director", label: "Creative Director" },
  ],

  business: [
    { value: "Entrepreneur", label: "Entrepreneur" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "Marketing Strategist", label: "Marketing Strategist" },
    { value: "Financial Analyst", label: "Financial Analyst" },
  ],

  science: [
    { value: "Research Scientist", label: "Research Scientist" },
    { value: "Laboratory Technician", label: "Laboratory Technician" },
    { value: "Biochemist", label: "Biochemist" },
  ],

  other: [
    { value: "Freelancer", label: "Freelancer" },
    { value: "Consultant", label: "Consultant" },
  ],
};
