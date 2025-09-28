import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import CardListDetailActivity from "@/components/molecules/card/CardListDetailActivity";
import CardListPost from "@/components/molecules/card/CardListPost";
import MessageInput from "@/components/molecules/message/MessageInput";
import LeftDetailActivity from "./LeftDetailActivity";

export default function DetailActivityWrapper() {
  return (
    <>
      <div className="pb-4">
        <BreadcrumbContent />
      </div>
      <div className="flex w-full flex-col gap-6 md:flex-row">
        <div className="md:w-2/3">
          <LeftDetailActivity />
        </div>
        <div className="flex flex-col gap-4 md:w-1/3">
          <MessageInput />
          <CardListPost />
          <CardListDetailActivity />
        </div>
      </div>
    </>
  );
}
