import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import ActivityByTypeContent from "./ActivityByTypeContent";

interface ActivityByTypeWrapperProps {
  name: string;
}

export default function ActivityByTypeWrapper({
  name,
}: ActivityByTypeWrapperProps) {
  return (
    <div className="space-y-6">
      <BreadcrumbContent />
      <ActivityByTypeContent name={name} />
    </div>
  );
}
