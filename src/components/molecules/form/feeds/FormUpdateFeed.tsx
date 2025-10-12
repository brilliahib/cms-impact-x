"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Feed } from "@/types/feeds/feed";
import { feedSchema, FeedType } from "@/validators/feed/feed-validator";
import { useUpdateFeed } from "@/http/feeds/update-feed";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useGetAllActivityUser } from "@/http/activity/get-all-activity-user";
import { useGetProfileSummary } from "@/http/profile/get-use-profile-user";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { buildFromAppURL } from "@/utils/misc";
import { useGetDetailFeed } from "@/http/feeds/get-detail-feed";

interface FormUpdateFeedProps {
  id: number;
  setOpen: (open: boolean) => void;
}

export default function FormUpdateFeed({ id, setOpen }: FormUpdateFeedProps) {
  const { data: session, status } = useSession();
  const { data } = useGetDetailFeed(id, session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const { data: activity } = useGetAllActivityUser(
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

  const defaultValues = useMemo(
    () => ({
      content: data?.data.content || "",
      activity_id: data?.data.activity_id || undefined,
    }),
    [data],
  );

  const form = useForm<FeedType>({
    resolver: zodResolver(feedSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        content: data.data.content || "",
        activity_id: data.data.activity_id || undefined,
      });
    }
  }, [data, form]);

  const queryClient = useQueryClient();

  const { mutate: updateFeedHandler, isPending } = useUpdateFeed({
    onError: () => {
      toast.error("Failed to update feed!");
    },
    onSuccess: () => {
      toast.success("Successfully updated feed!");
      queryClient.invalidateQueries({
        queryKey: ["get-all-feed"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: FeedType) => {
    updateFeedHandler({ id, body });
  };

  return (
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
                    {activity?.data.map((activity) => (
                      <SelectItem key={activity.id} value={String(activity.id)}>
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

        <div className="flex justify-end">
          <Button type="submit" size={"lg"} disabled={isPending}>
            {isPending ? "Loading..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
