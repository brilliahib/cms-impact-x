import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import CardListDetailActivity from "@/components/molecules/card/CardListDetailActivity";
import CardListPost from "@/components/molecules/card/CardListPost";
import MessageInput from "@/components/molecules/message/MessageInput";

export default function DetailActivityWrapper() {
  return (
    <>
      <BreadcrumbContent />
      <div className="flex w-full flex-col gap-6 md:flex-row">
        <div className="md:w-3/4"></div>
        <div className="flex flex-col gap-4">
          <MessageInput />
          <CardListPost />
          <CardListDetailActivity />
        </div>
      </div>
    </>
  );
}
