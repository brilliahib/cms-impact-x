"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function CardProfileFeed() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <Card className="w-full overflow-hidden pt-0">
        <div className="relative h-32 w-full md:h-36">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="relative mx-auto -mt-20 flex h-[100px] w-[100px]">
          <Skeleton className="h-[100px] w-[100px] rounded-full border-4 border-white shadow-md" />
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

  if (!session) {
    return (
      <Card className="bg-muted w-full overflow-hidden pt-0">
        <div className="relative h-32 w-full md:h-36">
          <div className="bg-muted h-full w-full" />
        </div>
        <div className="relative mx-auto -mt-20 flex h-[100px] w-[100px]">
          <div className="bg-muted h-[100px] w-[100px] rounded-full border-4 border-white shadow-md" />
        </div>
        <CardContent>
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-lg font-semibold">Don&apos;t have account?</h1>
            <span className="text-muted-foreground text-sm">
              Please login or register to continue
            </span>
            <div className="flex gap-2">
              <Button variant="default" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden pt-0">
      <div className="relative h-32 w-full md:h-36">
        <Image
          src="/images/profile/bg.jpg"
          alt="background"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative mx-auto -mt-20 flex h-[100px] w-[100px] md:h-[100px] md:w-[100px]">
        <Image
          src="/images/profile/profile.jpg"
          alt="profile"
          fill
          className="rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>
      <CardContent>
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-lg font-semibold">
            {session?.user.first_name} {session?.user.last_name}
          </h1>
          <span className="text-muted-foreground text-sm">
            UI/UX Designer | Universitas Diponegoro
          </span>
          <p className="text-sm text-[#0284C7]">40+ Followers</p>
        </div>
      </CardContent>
    </Card>
  );
}
