"use client";

import { useGetAllActivity } from "@/http/activity/get-all-activity";
import { useSession } from "next-auth/react";
import CardListActivity from "@/components/molecules/card/CardListActivity";
import { useState } from "react";
import { Activity } from "@/types/activity/activity";
import CardActivityDetail from "@/components/molecules/card/CardActivityDetail";
import { useGetDetailActivity } from "@/http/activity/get-detail-activity";

export default function ActivityContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllActivity(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const defaultId = selectedId ?? data?.data[0]?.id ?? null;

  const { data: detail, isPending: isDetailPending } = useGetDetailActivity(
    defaultId!,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && defaultId !== null,
    },
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <CardListActivity
        data={data?.data}
        isPending={isPending}
        onSelect={(id) => setSelectedId(id)}
      />

      <CardActivityDetail
        session={session!}
        data={detail?.data}
        isPending={isDetailPending}
      />
    </div>
  );
}
