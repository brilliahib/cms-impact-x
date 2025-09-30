"use client";

import CardProfile from "@/components/molecules/card/CardProfile";
import ProfileRightContent from "./ProfileRightContent";
import ProfileScrollContent from "./ProfileScrollContent";
import { useSession } from "next-auth/react";
import { useGetProfileUser } from "@/http/profile/get-profile-user";

export default function ProfileWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetProfileUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <>
      <section className="flex w-full flex-col gap-6 md:flex-row">
        <div className="space-y-6 md:w-3/4">
          <CardProfile />
          <ProfileScrollContent profile={data?.data} isPending={isPending} />
        </div>
        <div className="md:w-1/4">
          <ProfileRightContent />
        </div>
      </section>
    </>
  );
}
