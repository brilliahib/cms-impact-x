"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const token = session?.access_token;

  const { data, isPending } = useGetAllActivityUser(username ?? "", token!, {
    enabled: !!token && !!username,
  });

  const isEmpty = !isPending && (!data?.data || data.data.length === 0);

  if (status === "loading") {
    return (
      <Card className="shadow-xs">
        <CardHeader className="flex items-center justify-between px-4 py-0 pb-6 shadow-xs 2xl:px-6">
          <CardTitle>Current Activity</CardTitle>
        </CardHeader>
        <CardContent className="px-4 2xl:px-6">
          <ScrollArea className="md:max-h-60">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="gap-0 p-2">
                  <CardHeader className="flex justify-between border-b p-2">
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
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card className="shadow-xs">
        <CardHeader className="flex items-center justify-between px-4 py-0 pb-6 shadow-xs 2xl:px-6">
          <CardTitle>Current Activity</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground px-4 py-6 text-center">
          Please login to view your current activities.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xs">
      <CardHeader className="flex items-center justify-between px-4 py-0 pb-6 shadow-xs 2xl:px-6">
        <CardTitle>Current Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-4 2xl:px-6">
        <div className="space-y-6">
          {isPending ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="gap-0 p-2">
                  <CardHeader className="flex justify-between border-b p-2">
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
          ) : isEmpty ? (
            <p className="text-muted-foreground text-sm">
              No current activity available.
            </p>
          ) : (
            data?.data?.map((activity) => (
              <Link key={activity.id} href={`/activity/${activity.id}`}>
                <Card className="gap-1 p-1 shadow-none hover:bg-gray-50">
                  <CardHeader className="flex flex-col gap-2 border-b-2 p-2">
                    <div className="flex w-full justify-between">
                      <CardTitle className="line-clamp-1 w-full text-sm">
                        {activity.title}
                      </CardTitle>
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
                      <Badge className="capitalize">
                        {activity.activity_type}
                      </Badge>
                      {activity.activity_category.map((category, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="capitalize"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 p-2">
                    {/* === Author Section === */}
                    {activity.user && (
                      <div className="flex items-center gap-3 py-1">
                        <Image
                          src={
                            activity.user.profile_images
                              ? buildFromAppURL(activity.user.profile_images)
                              : "/images/profile/profile-2d.png"
                          }
                          alt={activity.user.name ?? "Profile User"}
                          width={40}
                          height={40}
                          className="min-h-[40px] min-w-[40px] rounded-full border object-cover"
                        />
                        <div className="text-sm">
                          <div className="flex items-center gap-2">
                            <p className="line-clamp-1 font-semibold">
                              {activity.user.name}
                            </p>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-xs text-green-700"
                            >
                              Author
                            </Badge>
                          </div>
                          <p className="text-muted-foreground line-clamp-1 text-xs">
                            {activity.user.role}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* === Participants Section === */}
                    {(activity.participants || []).length > 0 ? (
                      <>
                        {(activity.participants || [])
                          .slice(0, 2)
                          .map((participant) => (
                            <div
                              key={participant.id}
                              className="flex items-center gap-3 py-1"
                            >
                              <Image
                                src={
                                  participant.profile_images
                                    ? buildFromAppURL(
                                        participant.profile_images,
                                      )
                                    : "/images/profile/profile-2d.png"
                                }
                                alt={participant.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div className="flex flex-col gap-1">
                                <Link href={`/profile/${participant.username}`}>
                                  <h1 className="line-clamp-1 text-sm font-medium">
                                    {participant.name}
                                  </h1>
                                </Link>
                                <span className="text-muted-foreground line-clamp-1 text-sm">
                                  {participant.role}
                                </span>
                              </div>
                            </div>
                          ))}

                        {(activity.participants || []).length > 2 && (
                          <div className="mt-2 flex justify-center">
                            <h1 className="text-sm text-[#0284C7]">
                              +{(activity.participants || []).length - 1} more
                            </h1>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No participants yet.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
