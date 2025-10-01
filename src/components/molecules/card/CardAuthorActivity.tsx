import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "@/types/activity/activity";
import { buildFromAppURL } from "@/utils/misc";
import { format } from "date-fns";
import { Clock3, Ellipsis, MapPin, UsersRound } from "lucide-react";
import Image from "next/image";
import { id } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

interface CardAuthorActivityProps {
  data?: Activity;
  isPending?: boolean;
}

export default function CardAuthorActivity({
  data,
  isPending,
}: CardAuthorActivityProps) {
  if (isPending) {
    return (
      <Card>
        <CardHeader className="border-b-2 pb-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
        </CardHeader>

        <CardHeader className="border-b-2 pb-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="mt-2 h-4 w-56" />
          <div className="mt-4">
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </CardHeader>

        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-24 w-40 rounded-lg" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-row justify-between gap-4">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b-2 pb-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={
                data?.user.profile_images
                  ? buildFromAppURL(data.user.profile_images)
                  : "/images/profile/profile-2d.png"
              }
              alt={data?.user.name ?? "Profile User"}
              width={50}
              height={50}
              className="rounded-full border"
            />
            <div className="flex flex-col gap-1">
              <h1 className="font-medium">{data?.user.name}</h1>
              <span className="text-muted-foreground text-sm">
                {data?.user.role ?? ""} | {data?.user.university ?? ""}
              </span>
            </div>
          </div>
          <div>
            <Ellipsis />
          </div>
        </div>
      </CardHeader>
      <CardHeader className="border-b-2 pb-4">
        <CardTitle>Joined</CardTitle>
        <CardDescription>
          Participants who have joined your activity
        </CardDescription>
        <div className="space-y-4 py-6">
          {data?.participants && data.participants.length > 0 ? (
            data.participants.map((participant) => (
              <Card className="px-3 py-2" key={participant.id}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      src={
                        participant.profile_images
                          ? buildFromAppURL(participant.profile_images)
                          : "/images/profile/profile-2d.png"
                      }
                      alt={participant.name ?? "Profile User"}
                      width={50}
                      height={50}
                      className="rounded-full border"
                    />
                    <div className="flex flex-col gap-1 text-sm">
                      <p className="font-semibold">{participant.name}</p>
                      <div className="text-muted-foreground flex flex-row gap-1">
                        <p>{participant.role} </p>
                        <span className="opacity-30">|</span>
                        <p>{participant.university}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Ellipsis />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              No participants yet.
            </p>
          )}
        </div>
      </CardHeader>
      <div className="space-y-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div>
                <div className="flex flex-row items-center gap-8">
                  <CardTitle className="text-xl">{data?.title}</CardTitle>
                  <Badge
                    variant={"default"}
                    className="rounded-full bg-green-100 px-4 text-base text-green-700"
                  >
                    {data?.total_participants}/{data?.max_participants}
                  </Badge>
                </div>
                <CardDescription className="text-muted-foreground py-2">
                  {data?.created_at && (
                    <p>
                      Posted on:{" "}
                      {format(new Date(data?.created_at), "d MMMM yyyy", {
                        locale: id,
                      })}
                    </p>
                  )}
                </CardDescription>
              </div>
              <div className="flex w-3/4 flex-wrap gap-2">
                <Badge>{data?.activity_type}</Badge>
                <div>
                  {data?.activity_category.map((category, index) => (
                    <Badge key={index} variant={"secondary"}>
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {data?.images && (
                <Image
                  src={buildFromAppURL(data.images)}
                  alt="Poster Activity"
                  className="max-h-[200px] rounded-lg object-cover md:max-h-[200px]"
                  width={300}
                  height={300}
                />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-row justify-between gap-4">
            <Card className="flex-1 p-4">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <h1 className="text-sm font-medium">Location</h1>
              </div>
              <p className="font-medium">{data?.location ?? ""}</p>
            </Card>

            <Card className="flex-1 p-4">
              <div className="flex gap-2">
                <Clock3 size={20} />
                <h1 className="text-sm font-medium">Duration</h1>
              </div>
              {data?.start_date && data?.end_date && (
                <p className="font-medium">
                  {format(new Date(data.start_date), "d MMMM yyyy", {
                    locale: id,
                  })}{" "}
                  -{" "}
                  {format(new Date(data.end_date), "d MMMM yyyy", {
                    locale: id,
                  })}
                </p>
              )}
            </Card>

            <Card className="flex-1 p-4">
              <div className="flex gap-2">
                <UsersRound size={20} />
                <h1 className="text-sm font-medium">Max Participants</h1>
              </div>
              <p className="font-medium">
                {data?.max_participants ?? 0} People
              </p>
            </Card>
          </div>
          <div>
            <h1 className="pb-2 font-bold">Description</h1>
            <p className="text-muted-foreground text-justify">
              {data?.description ?? "No description available."}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <h1 className="font-bold">Requirements</h1>
              <p className="text-muted-foreground">
                {data?.requirements ?? "No requirements available."}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h1 className="font-bold">Benefits</h1>
              <p className="text-muted-foreground">
                {data?.benefits ?? "No benefits available."}
              </p>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
