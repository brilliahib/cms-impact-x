export interface CareerPath {
  title: string;
  description: string;
  roadmap: RoadmapItem[];
  average_salary: string;
  requirements: string[];
  recommended_majors: string[];
  recommended_companies: string[];
}

export interface RoadmapItem {
  step: string;
  explanation: string;
}
