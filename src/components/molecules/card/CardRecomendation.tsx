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

  const dataFiltered = data?.data?.filter(
    (activity: Activity) =>
      activity.activity_type?.toLowerCase() === type.toLowerCase(),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Loading state */}
          {isPending &&
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
            ))}

          {/* Empty state */}
          {!isPending && dataFiltered?.length === 0 && (
            <p className="text-muted-foreground text-center text-sm">
              {emptyMessage}
            </p>
          )}

          {/* Render max 3 */}
          {dataFiltered?.slice(0, 3).map((activity: Activity) => (
            <Card key={activity.id} className="p-2">
              <CardContent className="space-y-2 p-1">
                <div className="flex justify-between">
                  <h1 className="line-clamp-1 text-sm font-medium">
                    {activity.title}
                  </h1>
                  <Badge className="rounded-full bg-green-500/20 text-green-500">
                    {activity.total_participants}/{activity.max_participants}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{type}</Badge>
                  {activity.activity_category.map(
                    (cat: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-muted-foreground"
                      >
                        {cat}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
