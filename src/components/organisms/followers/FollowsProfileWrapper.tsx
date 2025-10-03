"use client";

import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import CardFollowsContent from "@/components/molecules/card/CardFollowsContent";
import {
  useGetFollowersByUsername,
  useGetFollowingsByUsername,
} from "@/http/follow/get-follows-by-username";
import { useSession } from "next-auth/react";

export default function FollowsProfileWrapper() {
  const { data: session, status } = useSession();

  const username = session?.user?.username;

  const {
    data: followers,
    isPending: isFollowersPending,
    error: followersError,
  } = useGetFollowersByUsername(
    username as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!username,
    },
  );

  const {
    data: followings,
    isPending: isFollowingsPending,
    error: followingsError,
  } = useGetFollowingsByUsername(
    username as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!username,
    },
  );

  // Loading state
  if (status === "loading" || isFollowersPending || isFollowingsPending) {
    return <div>Loading...</div>;
  }

  // Unauthenticated state
  if (status === "unauthenticated" || !username) {
    return <div>Silakan login terlebih dahulu.</div>;
  }

  // Error state
  if (followersError || followingsError) {
    return <div>Terjadi kesalahan saat mengambil data.</div>;
  }

  const followersData = followers?.data ?? [];
  const followingsData = followings?.data ?? [];

  return (
    <>
      <div className="mb-6 w-full">
        <BreadcrumbContent />
      </div>
      <CardFollowsContent
        followers={followersData}
        followings={followingsData}
        currentUserUsername={username}
        profileUsername={username}
      />
    </>
  );
}
