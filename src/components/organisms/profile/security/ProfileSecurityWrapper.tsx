import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import CardSecurityProfile from "@/components/molecules/card/CardSecurityProfile";
import SideTabProfile from "@/components/molecules/tabs/SideTabProfile";

export default function ProfileSecurityWrapper() {
  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      <div className="top-24 flex h-fit w-60 shrink-0 flex-col gap-6 self-start md:sticky">
        <BreadcrumbContent />
        <SideTabProfile />
      </div>
      <div className="flex-1">
        <CardSecurityProfile />
      </div>
    </div>
  );
}
