"use client";

import { useState } from "react";

import CardContactInfo from "@/components/molecules/card/CardContactInfo";
import CardCurrentActivity from "@/components/molecules/card/CardCurrentActivity";
import CardListPost from "@/components/molecules/card/CardListFeed";
import { ProfileUser } from "@/types/profile/profile-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllFeedUser } from "@/http/feeds/get-all-feeds-user";
import { useSession } from "next-auth/react";
import { useGetAllActivityUser } from "@/http/activity/get-all-activity-user";
import CardListActivity from "@/components/molecules/card/CardListActivity";

interface ProfileScrollUsernameContentProps {
  profile?: ProfileUser;
  isPending?: boolean;
  username?: string;
}

export default function ProfileScrollUsernameContent({
  username,
  profile,
  isPending,
}: ProfileScrollUsernameContentProps) {
  const [activeTab, setActiveTab] = useState<string>("feeds");

  const { data: session, status } = useSession();

  const { data: feed, isPending: feedIsPending } = useGetAllFeedUser(
    username as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && activeTab === "feeds",
    },
  );

  const { data: activity, isPending: activityIsPending } =
    useGetAllActivityUser(username as string, session?.access_token as string, {
      enabled: status === "authenticated" && activeTab === "activity",
    });

  return (
    <>
      <div className="flex w-full flex-col gap-6 md:flex-row">
        {/* left content */}
        <div className="hidden space-y-4 md:block md:w-1/4 lg:w-1/3">
          <CardContactInfo data={profile} isPending={isPending} />
          <CardCurrentActivity username={username} />
        </div>

        {/* right content */}
        <div className="w-full md:w-3/4 lg:w-2/3">
          <Tabs defaultValue="feeds" onValueChange={setActiveTab}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="feeds">Feeds</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="feeds" className="w-full">
              <CardListPost data={feed?.data} isPending={feedIsPending} />
            </TabsContent>
            <TabsContent value="activity">
              <CardListActivity
                data={activity?.data}
                isPending={activityIsPending}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
