"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllActivityUser } from "@/http/activity/get-all-activity-user";
import { useCreateFeed } from "@/http/feeds/create-feed";
import { useGetProfileSummary } from "@/http/profile/get-use-profile-user";
import { buildFromAppURL } from "@/utils/misc";
import { feedSchema, FeedType } from "@/validators/feed/feed-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import DialogCreateActivity from "../../dialog/activity/DialogCreateActivity";

interface FormCreateFeedProps {
  setOpen: (open: boolean) => void;
}

export default function FormCreateFeed({ setOpen }: FormCreateFeedProps) {
  const [isDialogCreateActivityOpen, setIsDialogCreateActivityOpen] =
    useState(false);

  const { data: session, status } = useSession();
  const { data } = useGetAllActivityUser(
    session?.user.username as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: profile, isPending: isProfilePending } = useGetProfileSummary(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const form = useForm<FeedType>({
    resolver: zodResolver(feedSchema),
    defaultValues: {
      content: "",
      activity_id: undefined,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: CreateFeedHandlers, isPending } = useCreateFeed({
    onError: () => {
      toast.error("Failed to create new feed!");
    },
    onSuccess: () => {
      toast.success("Successfully created new feed!");
      queryClient.invalidateQueries({
        queryKey: ["feed-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-feed"],
      });
      setOpen(false);
    },
  });

  const handleDialogCreateActivityOpen = () => {
    setIsDialogCreateActivityOpen(true);
  };

  const onSubmit = (body: FeedType) => {
    CreateFeedHandlers({
      ...body,
      activity_id: body.activity_id ? Number(body.activity_id) : undefined,
    });
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            {isProfilePending ? (
              <>
                <Skeleton className="h-[50px] w-[50px] rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-3 w-[80px]" />
                </div>
              </>
            ) : (
              <>
                <Image
                  src={
                    profile?.data.profile?.profile_images
                      ? buildFromAppURL(profile.data.profile.profile_images)
                      : "/images/profile/profile-2d.png"
                  }
                  alt={profile?.data.first_name ?? "Profile User"}
                  width={50}
                  height={50}
                  className="rounded-full border"
                />
                <div>
                  <h3 className="font-semibold">
                    {profile?.data.first_name} {profile?.data.last_name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {profile?.data.profile?.role}
                  </p>
                </div>
              </>
            )}
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="content"
                    placeholder="Write something to share with others…"
                    {...field}
                    className="h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activity_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Activity (Optional)</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an activity to invite others to join" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.data.map((activity) => (
                        <SelectItem
                          key={activity.id}
                          value={String(activity.id)}
                        >
                          {activity.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <p className="text-muted-foreground text-sm">
              Or you can create a new activity here.{" "}
              <span
                className="cursor-pointer text-sky-600 hover:underline"
                onClick={handleDialogCreateActivityOpen}
              >
                Create Activity
              </span>
            </p>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size={"lg"} disabled={isPending}>
              {isPending ? "Loading..." : "Share"}
            </Button>
          </div>
        </form>
      </Form>

      <DialogCreateActivity
        open={isDialogCreateActivityOpen}
        setOpen={setIsDialogCreateActivityOpen}
      />
    </>
  );
}
