import { useSession } from "next-auth/react";
import MessageChatRoom from "../message/MessageChatRoom";
import { useGetAllChatActivity } from "@/http/activity/chat/get-all-chat-activity";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { buildFromAppURL } from "@/utils/misc";
import Link from "next/link";
import { format } from "date-fns";
import { id as IdLocale } from "date-fns/locale";
import CardListActivityChat from "./CardListActivityChat";

interface CardChatRoomActivityProps {
  id: number;
}

export default function CardChatRoomActivity({
  id,
}: CardChatRoomActivityProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllChatActivity(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="space-y-6">
      <MessageChatRoom id={id} />
      <CardListActivityChat data={data?.data} isPending={isPending} />
    </div>
  );
}
