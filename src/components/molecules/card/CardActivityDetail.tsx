import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Activity } from "@/types/activity/activity";
import { buildFromAppURL } from "@/utils/misc";
import { format } from "date-fns";
import { ArrowRight, Clock3, MapPin, Send } from "lucide-react";
import Image from "next/image";
import { id } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateRegistration } from "@/http/activity/registrations/create-registration";
import { toast } from "sonner";
import { useState } from "react";
import AlertDialogCreateRegistration from "@/components/atoms/alert-dialog/activity/registration/AlertDialogCreateRegistration";
import { useGetCheckApplyRegistration } from "@/http/activity/registrations/get-check-apply-registration";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useFollowUser } from "@/http/follow/follow-user";

interface CardActivityDetailProps {
  data?: Activity;
  isPending?: boolean;
  session?: Session;
}

export default function CardActivityDetail({
  data,
  isPending,
  session,
}: CardActivityDetailProps) {
  const { data: check } = useGetCheckApplyRegistration(
    data?.id ?? 0,
    (session?.access_token as string) ?? "",
    {
      enabled: !!data?.id && !!session?.access_token,
    },
  );

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const createRegistration = useCreateRegistration({
    onSuccess: () => {
      toast.success("Successfully applied this activity!");
      setOpen(false);
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ["get-check-apply-registration", data.id],
        });
      }
    },
    onError: () => {
      toast.error("Failed to apply this activity!");
    },
  });

  const isLoggedIn = !!session?.user;
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const followMutation = useFollowUser({
    onSuccess: () => {
      toast.success("You are now following this user!");
      queryClient.invalidateQueries({ queryKey: ["suggest-people"] });
      queryClient.invalidateQueries({
        queryKey: ["get-user-profile", data?.user?.id],
      });
    },
    onError: () => {
      toast.error("Failed to follow this user!");
    },
  });

  const handleApply = () => {
    setOpen(true);
  };

  const confirmApply = () => {
    if (!data?.id) return;
    createRegistration.mutate({
      activity_id: data.id,
    });
  };

  if (isPending) {
    return (
      <Card className="w-full md:flex-3">
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
    <div className="w-full md:max-w-[60%] md:basis-[60%]">
      <Card>
        <CardHeader className="border-b pb-4">
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
                className="min-h-[50px] min-w-[50px] rounded-full border object-cover"
              />
              <div className="flex flex-col gap-1">
                <h1 className="font-medium">{data?.user.name}</h1>
                {data?.user.role && data?.user.university && (
                  <span className="text-muted-foreground text-sm">
                    {data?.user.role ?? ""} | {data?.user.university ?? ""}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {session?.user.id === data?.user.id ? (
                <div className="flex items-center gap-4">
                  <Badge
                    variant="default"
                    className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                  >
                    Your Activity
                  </Badge>
                  <Link href={`/activity/${data?.id}`}>
                    <Button variant={"outline"} className="cursor-pointer">
                      See Details
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Button
                    variant={isFollowing ? "secondary" : "outline"}
                    size="sm"
                    disabled={!isLoggedIn || followMutation.isPending}
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast.error("Please log in to follow users.");
                        return;
                      }
                      followMutation.mutate(data?.user.username ?? "");
                      setIsFollowing(true);
                    }}
                    className="cursor-pointer"
                  >
                    {followMutation.isPending
                      ? "Following..."
                      : isFollowing
                        ? "Following"
                        : "Follow"}
                  </Button>
                  <Button onClick={handleApply} disabled={check?.data.applied}>
                    {check?.data.applied ? "Applied" : "Apply Now"} <Send />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <ScrollArea className="h-[60vh] w-full">
          <div className="space-y-6">
            <CardHeader className="border-b pb-4">
              <div className="space-y-4">
                {data?.participants && data.participants.length > 0 ? (
                  <div className="relative w-full">
                    <Carousel className="relative mx-auto w-[85%] max-w-6xl 2xl:w-[90%]">
                      <CarouselContent className="-ml-2 flex items-stretch md:-ml-4">
                        {data?.user ||
                        (data?.participants && data.participants.length > 0) ? (
                          <>
                            {data?.user && (
                              <CarouselItem
                                key={`author-${data.user.id}`}
                                className="basis-full pl-2 md:basis-1/2 md:pl-4 2xl:basis-1/3"
                              >
                                <Card className="h-full border-2 border-green-300 px-0 py-1 shadow-none">
                                  <CardContent className="flex items-center gap-4 p-2">
                                    <Image
                                      src={
                                        data.user.profile_images
                                          ? buildFromAppURL(
                                              data.user.profile_images,
                                            )
                                          : "/images/profile/profile-2d.png"
                                      }
                                      alt={data.user.name ?? "Profile User"}
                                      width={45}
                                      height={45}
                                      className="min-h-[45px] min-w-[45px] rounded-full border object-cover"
                                    />
                                    <div className="text-sm">
                                      <div className="flex gap-2">
                                        <p className="line-clamp-1 font-semibold">
                                          {data.user.name}
                                        </p>
                                        <Badge
                                          variant="secondary"
                                          className="bg-green-100 text-xs text-green-700"
                                        >
                                          Author
                                        </Badge>
                                      </div>
                                      <p className="text-muted-foreground line-clamp-1 text-xs">
                                        {data.user.role}
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </CarouselItem>
                            )}

                            {/* 👥 Participants */}
                            {data?.participants?.map((participant) => (
                              <CarouselItem
                                key={participant.id}
                                className="basis-full pl-2 md:basis-1/2 md:pl-4 2xl:basis-1/3"
                              >
                                <Card className="h-full px-0 py-1 shadow-none">
                                  <CardContent className="flex items-center gap-4 p-2">
                                    <Image
                                      src={
                                        participant?.profile_images
                                          ? buildFromAppURL(
                                              participant?.profile_images,
                                            )
                                          : "/images/profile/profile-2d.png"
                                      }
                                      alt={participant?.name ?? "Profile User"}
                                      width={45}
                                      height={45}
                                      className="min-h-[45px] min-w-[45px] rounded-full border object-cover"
                                    />
                                    <div className="text-sm">
                                      <p className="line-clamp-1 font-semibold">
                                        {participant.name}
                                      </p>
                                      <p className="text-muted-foreground line-clamp-1 text-xs">
                                        {participant.role}
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </CarouselItem>
                            ))}
                          </>
                        ) : (
                          <p className="text-muted-foreground w-full text-center text-sm">
                            No participants yet.
                          </p>
                        )}
                      </CarouselContent>
                      <CarouselPrevious className="hover:bg-muted absolute top-1/2 -left-12 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-white shadow-md transition-colors" />
                      <CarouselNext className="hover:bg-muted absolute top-1/2 -right-12 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-white shadow-md transition-colors" />
                    </Carousel>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center text-sm">
                    No participants yet.
                  </p>
                )}
              </div>
            </CardHeader>
            <div className="space-y-6">
              <CardHeader className="flex items-start justify-between gap-6">
                <div className="flex flex-1 flex-col gap-2">
                  <div className="w-full">
                    <CardTitle className="text-xl">{data?.title}</CardTitle>
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
                    {data?.activity_type && (
                      <Link
                        href={`/activity?type=${encodeURIComponent(
                          data.activity_type.toLowerCase(),
                        )}`}
                        passHref
                      >
                        <Badge className="cursor-pointer capitalize transition">
                          {data.activity_type}
                        </Badge>
                      </Link>
                    )}

                    {(Array.isArray(data?.activity_category)
                      ? data.activity_category
                      : (() => {
                          try {
                            return JSON.parse(data?.activity_category || "[]");
                          } catch {
                            return [];
                          }
                        })()
                    ).map((category: string, index: number) => (
                      <Link
                        key={index}
                        href={`/activity?category=${encodeURIComponent(
                          category.toLowerCase(),
                        )}`}
                        passHref
                      >
                        <Badge
                          variant="secondary"
                          className="cursor-pointer capitalize"
                        >
                          {category}
                        </Badge>
                      </Link>
                    ))}
                  </div>

                  <Card className="mt-6 flex flex-row items-center justify-between p-4 shadow-none">
                    <h1 className="font-medium">Total Participants</h1>

                    {data ? (
                      <Badge
                        variant="default"
                        className={`rounded-full px-4 text-base transition-colors ${
                          (data.total_participants ?? 0) >=
                          (data.max_participants ?? 0)
                            ? "bg-gray-200 text-gray-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {(data.total_participants ?? 0) >=
                        (data.max_participants ?? 0)
                          ? "Full"
                          : `${data.total_participants ?? 0}/${data.max_participants ?? 0}`}
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-gray-100 px-4 text-base text-gray-500"
                      >
                        Loading...
                      </Badge>
                    )}
                  </Card>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group h-[200px] w-[300px] cursor-pointer overflow-hidden rounded-lg">
                      {data?.images && (
                        <Image
                          src={buildFromAppURL(data.images)}
                          alt="Poster Activity"
                          className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                          width={300}
                          height={200}
                        />
                      )}
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none">
                    <VisuallyHidden>
                      <DialogTitle>Activity Image Preview</DialogTitle>
                    </VisuallyHidden>
                    <div className="relative flex h-full w-full items-center justify-center">
                      {data?.images && (
                        <Image
                          src={buildFromAppURL(data.images)}
                          alt="Poster Activity Full"
                          width={1200}
                          height={800}
                          className="max-h-[80vh] rounded-lg object-contain"
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={20} />
                      <h1 className="text-sm font-medium">Location</h1>
                    </div>
                    <p className="font-medium">{data?.location ?? ""}</p>
                  </Card>

                  <Card className="p-4">
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
                </div>
                <div>
                  <h1 className="pb-2 font-bold">Description</h1>
                  <p className="text-muted-foreground text-justify">
                    {data?.description ?? "No description available."}
                  </p>
                </div>
                <div className="flex flex-row gap-8">
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
          </div>
        </ScrollArea>
      </Card>
      <AlertDialogCreateRegistration
        open={open}
        setOpen={setOpen}
        confirmRegistration={confirmApply}
        isPending={createRegistration.isPending}
      />
    </div>
  );
}
