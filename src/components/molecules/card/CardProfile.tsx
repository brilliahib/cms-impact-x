"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfileUser } from "@/http/profile/get-profile-user";
import { buildFromAppURL } from "@/utils/misc";
import { Download, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const CardProfile = () => {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetProfileUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  if (status === "loading") {
    return (
      <Card className="w-full overflow-hidden p-0">
        {/* Background */}
        <div className="relative h-32 w-full md:h-44">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Profile Picture */}
        <div className="relative -mt-16 ml-4 flex h-[100px] w-[100px] justify-start rounded-full md:-mt-24 md:h-[150px] md:w-[150px]">
          <Skeleton className="h-full w-full rounded-full border-4 border-white shadow-md" />
        </div>

        <div className="-mt-0 flex flex-col items-start gap-4 px-6 md:-mt-24 md:flex-row md:items-center md:gap-6">
          <div className="space-y-2 md:ml-40">
            <Skeleton className="h-6 w-40" />
            <div className="flex flex-row gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 md:ml-auto md:w-auto md:flex-row">
            <Skeleton className="h-10 w-full md:w-44" />
            <Skeleton className="h-10 w-full md:w-32" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 p-6 md:flex-row">
          <div className="flex-1">
            <CardTitle className="pb-2 text-base md:pb-4 md:text-lg">
              <Skeleton className="h-6 w-20" />
            </CardTitle>
            <CardDescription className="mb-4 text-justify text-xs tracking-wider md:text-base">
              <Skeleton className="h-20 w-full" />
            </CardDescription>
          </div>

          <div className="flex basis-full flex-row items-center gap-2 md:basis-1/5">
            <Skeleton className="h-[50px] w-[50px] rounded-md" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden p-0">
      {/* Background */}
      <div className="relative h-32 w-full md:h-44">
        <Image
          src="/images/profile/bg.jpg"
          alt="background"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-16 ml-4 flex h-[100px] w-[100px] justify-start rounded-full md:-mt-24 md:h-[150px] md:w-[150px]">
        <Image
          src={
            buildFromAppURL(data?.data.profile_images) ??
            "/images/profile/profile.jpg"
          }
          alt={session?.user.first_name || "profile"}
          fill
          className="rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>

      <div className="-mt-0 flex flex-col items-start gap-4 px-6 md:-mt-24 md:flex-row md:items-center md:gap-6">
        <div className="space-y-1 md:ml-40">
          <h2 className="text-lg font-bold md:text-xl">
            {session?.user.first_name} {session?.user.last_name}
          </h2>
          <div className="flex flex-row gap-4 text-sm font-medium text-gray-900/60 md:text-base">
            <p>{data?.data.role}</p>
            <span className="opacity-30">|</span>
            <p className="text-sky-600">40+ Followers</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 md:ml-auto md:w-auto md:flex-row">
          <Button variant={"outline"}>
            <Download />
            Download Portofolio
          </Button>
          <Button className="w-full md:w-auto" variant={"outline"}>
            <Settings />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 p-6 md:flex-row">
        <div className="flex-1">
          <CardTitle className="pb-2 text-base md:pb-4 md:text-lg">
            About
          </CardTitle>
          <CardDescription className="mb-4 text-justify text-xs tracking-wider md:text-base">
            {data?.data.about_description ?? "-"}
          </CardDescription>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex flex-wrap items-center gap-4">
              {data?.data.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-4">
                  <p className="text-sky-600">{skill}</p>
                  {i < data.data.skills.length - 1 && (
                    <span className="opacity-40">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex basis-full flex-row items-center gap-2 md:basis-1/5">
          <Image
            src="/images/profile/undip.png"
            width={50}
            height={50}
            alt="undip"
            className="rounded-md"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xs font-semibold md:text-sm">
              {data?.data.university ?? "-"}
            </h2>
            <p className="text-xs">{data?.data.major ?? "-"}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardProfile;
