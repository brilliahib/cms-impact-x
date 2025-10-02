import CardFollowersContent from "../../molecules/card/CardFollowersContent";
import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";

export default function FollowersWrapper() {
  return (
    <>
      <div className="mb-6 w-full">
        <BreadcrumbContent />
      </div>
      <CardFollowersContent />
    </>
  );
}
