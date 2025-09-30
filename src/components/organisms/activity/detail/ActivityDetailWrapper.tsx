"use client";

import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import CardListDetailActivity from "@/components/molecules/card/CardListDetailActivity";
import MessageInput from "@/components/molecules/message/MessageInput";
import CardTopPost from "@/components/molecules/card/CardTopPost";
import ActivityDetailLeftContent from "./ActivityDetailLeftContent";
import { useSession } from "next-auth/react";
import { useGetDetailActivity } from "@/http/activity/get-detail-activity";

interface ActivityDetailWrapperProps {
  id: number;
}

export default function ActivityDetailWrapper({
  id,
}: ActivityDetailWrapperProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetDetailActivity(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <>
      <div className="mb-6 w-full">
        <BreadcrumbContent />
      </div>
      <div className="flex w-full flex-col gap-6 md:flex-row">
        <div className="md:w-2/3">
          <ActivityDetailLeftContent data={data?.data} isPending={isPending} />
        </div>
        <div className="flex flex-col gap-4 md:w-1/3">
          <MessageInput />
          <CardTopPost />
          <CardListDetailActivity id={id} />
        </div>
      </div>
    </>
  );
}
