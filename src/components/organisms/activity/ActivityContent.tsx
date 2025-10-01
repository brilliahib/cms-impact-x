"use client";

import { useGetAllActivity } from "@/http/activity/get-all-activity";
import { useSession } from "next-auth/react";
import CardListActivity from "@/components/molecules/card/CardListActivity";
import CardAuthorActivity from "@/components/molecules/card/CardAuthorActivity";
import { useState } from "react";
import { Activity } from "@/types/activity/activity";

export default function ActivityContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllActivity(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const sortedData = data?.data?.slice().sort((a, b) => a.id - b.id) ?? [];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <CardListActivity
        data={sortedData}
        isPending={isPending}
        onSelect={(activity) => setSelectedActivity(activity)}
      />

      <CardAuthorActivity
        data={selectedActivity ?? sortedData[0]}
        isPending={isPending}
      />
    </div>
  );
}
