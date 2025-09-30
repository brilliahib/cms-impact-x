import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllActivityUser } from "@/http/activity/get-all-activity-user";
import { buildFromAppURL } from "@/utils/misc";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface CardCurrentActivityProps {
  username?: string;
}

export default function CardCurrentActivity({
  username,
}: CardCurrentActivityProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllActivityUser(
    username as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Current Activity</CardTitle>
        <Button
          variant={"ghost"}
          className="text-[#0284C7] hover:bg-transparent hover:text-[#0284C7] hover:underline"
          size={"sm"}
        >
          <Link href={"/activity"}>See Details</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div>
          {isPending ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="gap-0 p-2">
                  <CardHeader className="flex justify-between border-b p-2 pb-4!">
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-40" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-5 w-24 rounded-full" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-[50px] w-[50px] rounded-full" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : data?.data && data.data.length > 0 ? (
            data.data.map((activity) => (
              <Card key={activity.id} className="gap-0 p-2">
                <CardHeader className="flex justify-between border-b p-2 pb-4!">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-sm">{activity.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge>{activity.activity_type}</Badge>
                      <Badge variant={"secondary"}>
                        {activity.activity_category}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Badge
                      variant={"secondary"}
                      className="text-muted-foreground"
                    >
                      {activity.total_participants}/{activity.max_participants}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-2">
                  {activity.participants && activity.participants.length > 0 ? (
                    activity.participants.map((participant) => (
                      <div key={participant.id} className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              participant.profile_images
                                ? buildFromAppURL(participant.profile_images)
                                : "/images/profile/profile-2d.png"
                            }
                            alt="Tidak dapat dimuat"
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <div className="flex flex-col gap-1">
                            <Link href={`/profile/${participant.username}`}>
                              <h1 className="text-sm font-medium">
                                {participant.name}
                              </h1>
                            </Link>
                            <span className="text-muted-foreground text-sm">
                              {participant.role}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <h1 className="text-sm text-[#0284C7]">+2 more</h1>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No participants yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              No current activity available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
