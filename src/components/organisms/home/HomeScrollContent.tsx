import CardListPost from "@/components/molecules/card/CardListFeed";
import MessageInput from "@/components/molecules/message/MessageInput";
import { useGetAllFeed } from "@/http/feeds/get-all-feed";
import { useSession } from "next-auth/react";

export default function HomeScrollContent() {
  const { data: feed, isPending: feedIsPending } = useGetAllFeed();
  return (
    <div className="flex flex-col gap-6">
      <MessageInput />
      <CardListPost data={feed?.data} isPending={feedIsPending} />
    </div>
  );
}
