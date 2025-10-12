"use client";

import { useSession } from "next-auth/react";
import { useGetUsers } from "@/http/user/get-users";
import CardSearchHome from "./CardSearchHome";

export default function CardSearchHomeWrapper() {
  const { data: session } = useSession();
  const token = session?.access_token as string;

  const { data, isPending, isError } = useGetUsers(token ?? "");

  if (isPending) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  return <CardSearchHome data={data?.data ?? []} />;
}
