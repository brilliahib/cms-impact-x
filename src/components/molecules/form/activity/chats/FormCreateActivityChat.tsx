"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useCreateChatActivity } from "@/http/activity/chat/create-chat-activity";
import { useGetProfileSummary } from "@/http/profile/get-use-profile-user";
import { buildFromAppURL } from "@/utils/misc";
import {
  activityChatSchema,
  ActivityChatType,
} from "@/validators/activity/chat/activity-chat-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormCreateActivityChatProps {
  setOpen: (open: boolean) => void;
  id: number;
}

export default function FormCreateActivityChat({
  id,
  setOpen,
}: FormCreateActivityChatProps) {
  const { data: session, status } = useSession();

  const { data: profile, isPending: isProfilePending } = useGetProfileSummary(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const form = useForm<ActivityChatType>({
    resolver: zodResolver(activityChatSchema),
    defaultValues: {
      message: "",
      activity_id: Number(id),
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: createActivityChatHandler, isPending } =
    useCreateChatActivity({
      onError: () => {
        toast.error("Failed to create new message!");
      },
      onSuccess: () => {
        toast.success("Successfully created new message!");
        queryClient.invalidateQueries({
          queryKey: ["get-all-chat-activity", id],
        });
        setOpen(false);
      },
    });

  const onSubmit = (body: ActivityChatType) => {
    createActivityChatHandler(body);
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
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="Write something to share with others…"
                    {...field}
                    className="h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" size={"lg"} disabled={isPending}>
              {isPending ? "Loading..." : "Share"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
