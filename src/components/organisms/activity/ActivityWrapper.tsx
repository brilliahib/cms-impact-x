import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import ActivityContent from "./ActivityContent";

export default function ActivityWrapper() {
  return (
    <div className="space-y-6">
      <BreadcrumbContent />
      <ActivityContent />
    </div>
  );
}
