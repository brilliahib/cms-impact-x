"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCountFollowUser } from "@/http/follow/get-count-follow-user";
import { useGetProfileUser } from "@/http/profile/get-profile-user";
import { buildFromAppURL } from "@/utils/misc";
import { Download, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CardProfile = () => {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetProfileUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: count, isPending: countPending } = useGetCountFollowUser(
    session?.user.username as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  if (status === "loading" || isPending) {
    return (
      <Card className="w-full overflow-hidden p-0">
        {/* Skeleton untuk loading */}
        <div className="relative h-32 w-full md:h-44">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="relative -mt-16 ml-4 flex h-[100px] w-[100px] rounded-full">
          <Skeleton className="h-full w-full rounded-full border-4 border-white shadow-md" />
        </div>
        <div className="-mt-0 flex flex-col gap-4 px-6 md:-mt-24">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
      </Card>
    );
  }

  const roleEmpty = !data?.data.role;
  const skillsEmpty = !data?.data.skills || data.data.skills.length === 0;
  const universityEmpty = !data?.data.university;
  const aboutEmpty = !data?.data.about_description;

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
      <div className="relative -mt-16 ml-4 flex h-[100px] w-[100px] rounded-full md:-mt-24 md:h-[150px] md:w-[150px]">
        <Image
          src={
            data?.data.profile_images
              ? buildFromAppURL(data.data.profile_images)
              : "/images/profile/profile-2d.png"
          }
          alt={session?.user.first_name || "profile"}
          fill
          className="rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>

      {/* Header Info */}
      <div className="-mt-0 flex flex-col items-start gap-4 px-6 md:-mt-22 md:flex-row md:items-center md:gap-6">
        <div className="space-y-1 md:ml-40">
          <h2 className="text-lg font-bold md:text-xl">
            {session?.user.first_name} {session?.user.last_name}
          </h2>

          <div className="flex flex-row gap-4 text-sm text-gray-900/60 md:text-base">
            {roleEmpty ? (
              <p>
                Isi role kamu{" "}
                <Link
                  href="/profile/edit"
                  className="text-sky-600 hover:underline"
                >
                  disini
                </Link>
              </p>
            ) : (
              <>
                <p>{data?.data.role}</p>
                <span className="opacity-30">|</span>
                <Link
                  href={`/followers`}
                  className="hover:text-sky-600 hover:underline"
                >
                  <p className="text-sky-600">
                    {count?.data.followers_count ?? 0} Followers
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 md:ml-auto md:w-auto md:flex-row">
          <Button variant={"outline"}>
            <Download />
            Download Portofolio
          </Button>
          <Button className="w-full md:w-auto" variant="outline">
            <Link href={"/profile/edit"} className="flex items-center gap-2">
              <Settings />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* Skills & University */}
      <div className="flex flex-col items-start justify-between gap-4 p-6 md:-mt-4">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Skills</h3>

            {skillsEmpty ? (
              // 🟢 Ajakan isi skill
              <p className="text-muted-foreground text-sm">
                Kamu belum menambahkan{" "}
                <span className="font-semibold">skill</span>.{" "}
                <Link
                  href="/profile/edit"
                  className="text-sky-600 hover:underline"
                >
                  Tambahkan di sini.
                </Link>
              </p>
            ) : (
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
            )}
          </div>

          <div className="mr-8 flex items-center gap-4">
            <Image
              src="/images/profile/undip.png"
              width={50}
              height={50}
              alt="university"
              className="rounded-md"
            />
            <div className="flex flex-col gap-1">
              {universityEmpty ? (
                <p className="text-muted-foreground text-xs">
                  <Link
                    href="/profile/edit"
                    className="font-semibold text-sky-600 hover:underline"
                  >
                    Tambah Universitas
                  </Link>
                </p>
              ) : (
                <>
                  <h2 className="text-xs font-semibold md:text-sm">
                    {data?.data.university}
                  </h2>
                  <p className="text-xs">{data?.data.major ?? "-"}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Accordion About */}
        <Accordion type="single" collapsible className="w-full p-0">
          <AccordionItem value="about">
            <AccordionTrigger className="text-muted-foreground justify-center rounded-none border-t pt-4 pb-0 text-sm font-medium hover:underline">
              See Details
            </AccordionTrigger>
            <AccordionContent>
              <CardTitle className="pb-2 text-base md:pb-4 md:text-lg">
                About
              </CardTitle>
              <CardDescription className="mt-2 text-justify text-xs md:text-sm">
                {aboutEmpty ? (
                  <p className="text-muted-foreground">
                    Kamu belum menambahkan deskripsi{" "}
                    <span className="font-semibold">About</span>.{" "}
                    <Link
                      href="/profile/edit"
                      className="text-sky-600 hover:underline"
                    >
                      Tulis sekarang.
                    </Link>
                  </p>
                ) : (
                  data?.data.about_description
                )}
              </CardDescription>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
};

export default CardProfile;
