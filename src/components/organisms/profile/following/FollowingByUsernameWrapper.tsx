"use client";

import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import CardFollowingByUsernameContent from "@/components/molecules/card/CardFollowingByUsernameContent";
// import {useGetFollowingByUsername} from "@/http/follow/get-following-by-username";

interface FollowingByUsernameWrapperProps {
  username: string;
}

export default function FollowingByUsernameWrapper({
  username,
}: FollowingByUsernameWrapperProps) {
  // const {data: session, status} = useSession();

  // const {data, isPending} = useGetFollowingByUsername(
  //     username,
  //     session?.access_token as string,
  //     {
  //         enabled: status === "authenticated",
  //     },
  // );

  return (
    <>
      <div className="mb-6 w-full">
        <BreadcrumbContent />
      </div>
      <CardFollowingByUsernameContent />
    </>
  );
}
