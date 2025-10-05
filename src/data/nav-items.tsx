import { FileText, HandHeart, Trophy } from "lucide-react";

export const components = [
  {
    title: "Project",
    href: "/activity?type=project",
    description: "Bangun portofolio dengan mengerjakan project",
    icon: FileText,
  },
  {
    title: "Competition",
    href: "/activity?type=competition",
    description: "Buktikan kemampuanmu bersama orang lain",
    icon: Trophy,
  },
  {
    title: "Volunteer",
    href: "/activity?type=volunteer",
    description: "Bergabung dalam kegiatan sosial untuk dampak nyata",
    icon: HandHeart,
  },
];
