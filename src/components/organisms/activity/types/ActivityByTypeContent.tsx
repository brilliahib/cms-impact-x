"use client";

import { useSession } from "next-auth/react";
import CardListActivity from "@/components/molecules/card/CardListActivity";
import { useState } from "react";
import CardActivityDetail from "@/components/molecules/card/CardActivityDetail";
import { useGetDetailActivity } from "@/http/activity/get-detail-activity";
import { useGetAllActivityByType } from "@/http/activity/get-activity-by-type";

interface ActivityByTypeContentProps {
  name: string;
}

export default function ActivityByTypeContent({
  name,
}: ActivityByTypeContentProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllActivityByType(
    session?.access_token as string,
    name,
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
        showSelect={false}
      />

      <CardActivityDetail
        session={session!}
        data={detail?.data}
        isPending={isDetailPending}
      />
    </div>
  );
}
