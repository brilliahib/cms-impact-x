"use client";

import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import CardFollowsContent from "@/components/molecules/card/CardFollowsContent";
import {
  useGetFollowersByUsername,
  useGetFollowingsByUsername,
} from "@/http/follow/get-follows-by-username";
import { useSession } from "next-auth/react";

interface FollowsByUsernameWrapperProps {
  username: string;
}

export default function FollowsByUsernameWrapper({
  username,
}: FollowsByUsernameWrapperProps) {
  const { data: session, status } = useSession();

  const {
    data: followers,
    isPending: isFollowersPending,
    error: followersError,
  } = useGetFollowersByUsername(username, session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const {
    data: followings,
    isPending: isFollowingsPending,
    error: followingsError,
  } = useGetFollowingsByUsername(username, session?.access_token as string, {
    enabled: status === "authenticated",
  });

  if (isFollowersPending || isFollowingsPending) {
    return <div>Loading...</div>;
  }

  if (followersError || followingsError) {
    return <div>Terjadi kesalahan saat mengambil data.</div>;
  }

  const currentUsername = session?.user?.username;

  const followersData = followers?.data ?? [];
  const currentUserInFollowers = followersData.find(
    (user) => user.username === currentUsername,
  );
  const otherFollowers = followersData.filter(
    (user) => user.username !== currentUsername,
  );
  const sortedFollowers = currentUserInFollowers
    ? [currentUserInFollowers, ...otherFollowers]
    : followersData;

  const followingsData = followings?.data ?? [];
  const currentUserInFollowings = followingsData.find(
    (user) => user.username === currentUsername,
  );
  const otherFollowings = followingsData.filter(
    (user) => user.username !== currentUsername,
  );
  const sortedFollowings = currentUserInFollowings
    ? [currentUserInFollowings, ...otherFollowings]
    : followingsData;

  return (
    <>
      <div className="mb-6 w-full">
        <BreadcrumbContent />
      </div>
      <CardFollowsContent
        followers={sortedFollowers}
        followings={sortedFollowings}
        currentUserUsername={currentUsername}
        profileUsername={username}
      />
    </>
  );
}
