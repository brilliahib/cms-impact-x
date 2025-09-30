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
import { Textarea } from "@/components/ui/textarea";
import { useGetAllActivityUser } from "@/http/activity/get-all-activity-user";
import { useCreateFeed } from "@/http/feeds/create-feed";
import { feedSchema, FeedType } from "@/validators/feed/feed-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormCreateFeedProps {
  setOpen: (open: boolean) => void;
}

export default function FormCreateFeed({ setOpen }: FormCreateFeedProps) {
  const { data: session, status } = useSession();
  const { data } = useGetAllActivityUser(
    session?.user.username as string,
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
      setOpen(false);
    },
  });

  const onSubmit = (body: FeedType) => {
    CreateFeedHandlers({
      ...body,
      activity_id: body.activity_id ? Number(body.activity_id) : undefined,
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
            {isPending ? "Loading..." : "Tambahkan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
