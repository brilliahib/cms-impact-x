"use client";

import CardProfile from "@/components/molecules/card/CardProfile";
import { useSession } from "next-auth/react";
import ProfileRightContent from "../ProfileRightContent";
import { useGetProfileByUsername } from "@/http/profile/get-profile-by-username";
import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import CardProfileByUsername from "@/components/molecules/card/CardProfileByUsername";
import ProfileScrollUsernameContent from "./ProfileScrollUsernameContent";

interface ProfileByUsernameWrapperProps {
  username: string;
}

export default function ProfileByUsernameWrapper({
  username,
}: ProfileByUsernameWrapperProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetProfileByUsername(
    username,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <>
      <div className="mb-6 w-full">
        <BreadcrumbContent />
      </div>
      <section className="flex w-full flex-col gap-6 md:flex-row">
        <div className="space-y-6 md:w-3/4">
          <CardProfileByUsername username={username} />
          <ProfileScrollUsernameContent
            profile={data?.data}
            isPending={isPending}
            username={username}
          />
        </div>
        <div className="md:w-1/4">
          <ProfileRightContent />
        </div>
      </section>
    </>
  );
}
