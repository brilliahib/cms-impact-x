"use client";

import { useState } from "react";

import CardContactInfo from "@/components/molecules/card/CardContactInfo";
import CardCurrentActivity from "@/components/molecules/card/CardCurrentActivity";
import CardListPost from "@/components/molecules/card/CardListFeed";
import { Button } from "@/components/ui/button";
import { ProfileUser } from "@/types/profile/profile-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllFeedUser } from "@/http/feeds/get-all-feeds-user";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";
import { useGetAllActivityUser } from "@/http/activity/get-all-activity-user";
import CardListActivity from "@/components/molecules/card/CardListActivity";
import DialogCreateFeed from "@/components/molecules/dialog/feeds/DialogCreateFeed";

interface ProfileScrollContentProps {
  profile?: ProfileUser;
  isPending?: boolean;
}

export default function ProfileScrollContent({
  profile,
  isPending,
}: ProfileScrollContentProps) {
  const [activeTab, setActiveTab] = useState<string>("feeds");
  const [isDialogCreateFeedOpen, setIsDialogCreateFeedOpen] =
    useState<boolean>(false);
  const [isDialogCreateActivityOpen, setIsDialogCreateActivityOpen] =
    useState<boolean>(false);

  const { data: session, status } = useSession();

  const { data: feed, isPending: feedIsPending } = useGetAllFeedUser(
    session?.user.username as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && activeTab === "feeds",
    },
  );

  const { data: activity, isPending: activityIsPending } =
    useGetAllActivityUser(
      session?.user.username as string,
      session?.access_token as string,
      {
        enabled: status === "authenticated" && activeTab === "activity",
      },
    );

  const handleDialogCreateFeedOpen = () => {
    setIsDialogCreateFeedOpen(true);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-6 md:flex-row">
        {/* left content */}
        <div className="hidden space-y-4 md:block md:w-1/4 lg:w-1/3">
          <CardContactInfo data={profile} isPending={isPending} />
          <CardCurrentActivity />
        </div>

        {/* right content */}
        <div className="w-full md:w-3/4 lg:w-2/3">
          <Tabs defaultValue="feeds" onValueChange={setActiveTab}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="feeds">Feeds</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              {activeTab === "feeds" && (
                <Button variant="outline" onClick={handleDialogCreateFeedOpen}>
                  Create Feed <Plus />
                </Button>
              )}
              {activeTab === "activity" && (
                <Button variant="outline">
                  Create Activity <Plus />
                </Button>
              )}
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

      <DialogCreateFeed
        open={isDialogCreateFeedOpen}
        setOpen={setIsDialogCreateFeedOpen}
      />
    </>
  );
}
