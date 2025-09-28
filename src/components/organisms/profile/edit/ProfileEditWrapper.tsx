import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import CardEditProfile from "@/components/molecules/card/CardEditProfile";
import SideTabProfile from "@/components/molecules/tabs/SideTabProfile";

export default function ProfileEditWrapper() {
  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      <div className="top-24 flex h-fit w-60 shrink-0 flex-col gap-6 self-start md:sticky">
        <BreadcrumbContent />
        <SideTabProfile />
      </div>
      <div className="flex-1">
        <CardEditProfile />
      </div>
    </div>
  );
}
