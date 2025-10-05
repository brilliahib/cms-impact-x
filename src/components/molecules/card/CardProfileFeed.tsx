"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useGetProfileSummary } from "@/http/profile/get-use-profile-user";
import { buildFromAppURL } from "@/utils/misc";
import { useGetCountFollowUser } from "@/http/follow/get-count-follow-user";

export default function CardProfileFeed() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetProfileSummary(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: count, isPending: isCountPending } = useGetCountFollowUser(
    session?.user.username as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  if (status === "loading" || isPending) {
    return (
      <Card className="w-full overflow-hidden pt-0 shadow-xs">
        <div className="relative h-16 w-full md:h-24 2xl:h-32">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="relative mx-auto -mt-20 flex h-[80px] w-[80px]">
          <Skeleton className="h-[80px] w-[80px] rounded-full border-4 border-white shadow-md" />
        </div>
        <CardContent>
          <div className="flex flex-col items-center gap-3 text-center">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-28" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden pt-0 shadow-xs">
      {/* background */}
      <div className="relative h-16 w-full md:h-24 2xl:h-32">
        {session ? (
          <Image
            src="/images/profile/bg.jpg"
            alt="background"
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
      </div>

      {/* profile picture */}
      <div className="relative mx-auto -mt-16 flex h-[72px] w-[72px]">
        {session ? (
          <Image
            src={
              data?.data.profile?.profile_images
                ? buildFromAppURL(data.data.profile.profile_images)
                : "/images/profile/profile-2d.png"
            }
            alt={data?.data.first_name ?? "Profile User"}
            width={72}
            height={72}
            className="rounded-full border-4 border-white object-cover shadow-md"
          />
        ) : (
          <Image
            src="/images/profile/no-profile.png"
            alt="profile"
            fill
            className="rounded-full border-4 border-white object-cover shadow-md"
          />
        )}
      </div>

      <CardContent>
        {session ? (
          <div className="-mt-2 flex flex-col items-center gap-3 text-center">
            <Link href={`/profile`} className="hover:underline">
              <h1 className="text-lg font-semibold">
                {session.user.first_name} {session.user.last_name}
              </h1>
            </Link>
            <span className="text-muted-foreground text-sm">
              {data?.data.profile ? (
                <>
                  {data.data.profile.role ?? ""} |{" "}
                  {data.data.profile.university ?? ""}
                </>
              ) : (
                ""
              )}
            </span>
            <Link href={`/followers`}>
              <p className="text-sm text-[#0284C7]">
                {count?.data.followers_count} Followers
              </p>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                Don&apos;t have account?
              </h1>
              <span className="text-muted-foreground text-sm">
                Join to build your portfolio and discover your career path.
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="default" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
