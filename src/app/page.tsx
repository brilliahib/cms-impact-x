"use client";

import HomeWrapper from "@/components/organisms/home/HomeWrapper";
import Navbar from "@/components/organisms/navbar/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <Navbar session={session!} isPending={status === "loading"} />
      <main className="pad-x-xl my-24">
        <HomeWrapper />
      </main>
    </>
  );
}
