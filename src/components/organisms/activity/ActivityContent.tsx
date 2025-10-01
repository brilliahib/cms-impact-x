"use client";

import CardDetailActivity from "@/components/molecules/card/CardDetailActivity";
import CardListActivity from "@/components/molecules/card/CardListActivity";
import { useGetAllActivity } from "@/http/activity/get-all-activity";
import { useSession } from "next-auth/react";

export default function ActivityContent() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllActivity(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <CardListActivity data={data?.data} isPending={isPending} />
      <CardDetailActivity />
    </div>
  );
}
