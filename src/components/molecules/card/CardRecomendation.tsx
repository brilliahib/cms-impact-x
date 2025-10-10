"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "@/types/activity/activity";
import { useGetAllActivityByType } from "@/http/activity/get-activity-by-type";
import Link from "next/link";

type Props = {
  type: "competition" | "project" | "volunteer";
  title: string;
  description: string;
  emptyMessage?: string;
};

export default function CardRecomendation({
  type,
  title,
  description,
  emptyMessage = `No ${type} available.`,
}: Props) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllActivityByType(
    session?.access_token as string,
    type,
    {
      enabled: status === "authenticated",
    },
  );

  const isLoggedIn = !!session?.user;

  const dataFiltered = data?.data?.filter(
    (activity: Activity) =>
      activity.activity_type?.toLowerCase() === type.toLowerCase(),
  );

  return (
    <Card className="shadow-xs">
      <CardHeader className="px-4 2xl:px-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="px-4 2xl:px-6">
        <div className="flex flex-col gap-4">
          {!isLoggedIn ? (
            <p className="text-center text-sm text-gray-500">
              Login to see {type}!
            </p>
          ) : isPending ? (
            [1, 2, 3].map((i) => (
              <Card key={i} className="p-2">
                <CardContent className="space-y-2 p-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-10 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </CardContent>
              </Card>
            ))
          ) : dataFiltered && dataFiltered.length > 0 ? (
            dataFiltered.slice(0, 3).map((activity: Activity) => (
              <Link key={activity.id} href={`/activity?id=${activity.id}`}>
                <Card className="p-2 shadow-none transition-colors hover:bg-gray-50">
                  <CardContent className="space-y-2 p-1">
                    <div className="flex items-center justify-between">
                      <h1 className="line-clamp-1 text-sm font-medium">
                        {activity.title}
                      </h1>
                      <Badge
                        variant="default"
                        className={`rounded-full px-3 font-semibold transition-colors ${
                          (activity.total_participants ?? 0) >=
                          (activity.max_participants ?? 0)
                            ? "bg-gray-200 text-gray-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {activity.total_participants ?? 0}/
                        {activity.max_participants}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="capitalize">{type}</Badge>
                      {activity.activity_category.map(
                        (cat: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-muted-foreground capitalize"
                          >
                            {cat}
                          </Badge>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground text-center text-sm">
              {emptyMessage}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
