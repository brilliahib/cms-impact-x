"use client";

import { useSession } from "next-auth/react";
import CardListActivity from "@/components/molecules/card/CardListActivity";
import { useState, useEffect } from "react";
import CardActivityDetail from "@/components/molecules/card/CardActivityDetail";
import { useGetDetailActivity } from "@/http/activity/get-detail-activity";
import { useGetAllActivityByType } from "@/http/activity/get-activity-by-type";
import { useSearchParams, useRouter } from "next/navigation";

export default function ActivityContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const typeFromUrl = searchParams.get("type") || "";
  const [activityType, setActivityType] = useState<string>(typeFromUrl);

  useEffect(() => {
    setActivityType(typeFromUrl);
  }, [typeFromUrl]);

  const { data, isPending } = useGetAllActivityByType(
    session?.access_token as string,
    activityType,
    {
      enabled: status === "authenticated",
    },
  );

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const activityIdFromUrl = searchParams.get("id");

  const defaultId =
    selectedId ??
    (activityIdFromUrl
      ? Number(activityIdFromUrl)
      : (data?.data[0]?.id ?? null));

  const { data: detail, isPending: isDetailPending } = useGetDetailActivity(
    defaultId!,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && defaultId !== null,
    },
  );

  const handleTypeChange = (type: string) => {
    setActivityType(type);
    const query = type ? `?type=${type}` : "";
    router.push(`/activity${query}`);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <CardListActivity
        data={data?.data}
        isPending={isPending}
        onSelect={(id) => setSelectedId(id)}
        onTypeChange={handleTypeChange}
        selectedType={activityType === "" ? "all" : activityType}
      />
      <CardActivityDetail
        session={session!}
        data={detail?.data}
        isPending={isDetailPending}
      />
    </div>
  );
}
