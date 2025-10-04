import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Feed } from "@/types/feeds/feed";
import {
  Ellipsis,
  Loader2,
  MessageCircleMore,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import { enUS, id } from "date-fns/locale";
import { buildFromAppURL } from "@/utils/misc";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useGetAllFeedComment } from "@/http/feeds/comments/get-all-feed-comment";
import { useState } from "react";
import { useCreateFeedComment } from "@/http/feeds/comments/create-feed-comment";
import { useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CardListFeedProps {
  data?: Feed[];
  isPending?: boolean;
}

function FeedSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="border-b pb-4">
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default function CardListFeed({ data, isPending }: CardListFeedProps) {
  const [activeFeedId, setActiveFeedId] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState("");

  const { data: comments, isPending: isCommentPending } = useGetAllFeedComment(
    activeFeedId!,
    {
      enabled: !!activeFeedId,
    },
  );

  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isCreating } = useCreateFeedComment(
    activeFeedId ?? 0,
    {
      onSuccess: () => {
        setCommentInput("");
        queryClient.invalidateQueries({
          queryKey: ["get-all-feed-comments", activeFeedId],
        });
        toast.success("Comment added successfully!");
      },
      onError: () => {
        toast.error("Failed to add comment. Please try again.");
      },
    },
  );
  return (
    <div className="w-full space-y-6">
      {isPending
        ? Array.from({ length: 3 }).map((_, i) => <FeedSkeleton key={i} />)
        : data?.map((feed) => (
            <Card key={feed.id} className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        feed?.user.profile_images
                          ? buildFromAppURL(feed.user.profile_images)
                          : "/images/profile/profile-2d.png"
                      }
                      alt={feed?.user.name ?? "Profile User"}
                      width={50}
                      height={50}
                      className="rounded-full border"
                    />
                    <div className="flex flex-col gap-1">
                      <Link
                        href={`/profile/${feed.user.username}`}
                        className="hover:underline"
                      >
                        <h1 className="font-medium">{feed.user.name}</h1>
                      </Link>
                      <span className="text-muted-foreground text-sm">
                        {feed?.user &&
                        (feed.user.role || feed.user.university) ? (
                          <>
                            {feed.user.role ?? ""}
                            {feed.user.role && feed.user.university
                              ? " | "
                              : ""}
                            {feed.user.university ?? ""}
                          </>
                        ) : (
                          ""
                        )}
                      </span>
                      <p className="text-muted-foreground text-xs">
                        {format(new Date(feed.created_at), "d MMMM yyyy", {
                          locale: id,
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Ellipsis />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border-b pb-4">
                  <h1 className="text-sm leading-6">{feed.content}</h1>
                </div>
                {feed.activity && (
                  <Link href={`/activity/${feed.activity.id}`}>
                    <Card className="mt-4 pt-0">
                      <CardHeader className="p-0">
                        <Image
                          src={buildFromAppURL(feed.activity.images)}
                          width={100}
                          height={100}
                          alt={feed.activity.title}
                          className="max-h-60 w-full rounded-t-xl object-cover"
                        />
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <h1 className="font-semibold">
                              {feed.activity.title}
                            </h1>
                            <Badge className="rounded-full bg-green-100 px-2 text-green-700">
                              {feed.activity.total_participants} /{" "}
                              {feed.activity.max_participants}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground line-clamp-1">
                            {feed.activity.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {feed.activity.activity_category.map(
                              (category, index) => (
                                <Badge
                                  variant={"secondary"}
                                  className="capitalize"
                                  key={index}
                                >
                                  {category}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <div className="flex items-center gap-4">
                    <div className="flex cursor-pointer items-center gap-2 text-sm">
                      <ThumbsUp size={18} />
                      Like
                    </div>
                    <div
                      className="flex cursor-pointer items-center gap-2 text-sm"
                      onClick={() =>
                        setActiveFeedId(
                          activeFeedId === feed.id ? null : feed.id,
                        )
                      }
                    >
                      <MessageCircleMore size={18} />
                      Comment
                    </div>
                  </div>
                  <div className="w-full">
                    {activeFeedId === feed.id && (
                      <div className="mt-4 w-full">
                        <ScrollArea className="h-50 w-full pb-4">
                          {isCommentPending ? (
                            <div className="space-y-4">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <Skeleton className="h-10 w-10 rounded-full" />
                                  <div className="w-full space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-5/6" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : comments && comments.data.length > 0 ? (
                            <div className="space-y-4">
                              {comments.data.map((comment) => (
                                <div
                                  key={comment.id}
                                  className="flex items-start gap-3"
                                >
                                  <Image
                                    src={
                                      comment.user.profile_images
                                        ? buildFromAppURL(
                                            comment.user.profile_images,
                                          )
                                        : "/images/profile/profile-2d.png"
                                    }
                                    alt={
                                      comment.user.first_name ?? "Profile User"
                                    }
                                    width={40}
                                    height={40}
                                    className="rounded-full border"
                                  />
                                  <div className="bg-muted w-full space-y-1 rounded-lg p-3 text-sm">
                                    <div className="flex items-center gap-2">
                                      <Link
                                        href={`/profile/${comment.user.username}`}
                                        className="hover:underline"
                                      >
                                        <h3 className="font-medium">
                                          {comment.user.first_name}{" "}
                                          {comment.user.last_name}
                                        </h3>
                                      </Link>
                                      <p className="text-muted-foreground text-xs">
                                        {formatDistanceToNow(
                                          new Date(comment.created_at),
                                          {
                                            addSuffix: true,
                                            includeSeconds: true,
                                            locale: enUS,
                                          },
                                        )}
                                      </p>
                                    </div>
                                    <p>{comment.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              No comments yet.
                            </p>
                          )}
                        </ScrollArea>

                        <div className="mt-2 flex items-center gap-2">
                          <Input
                            placeholder="Write a comment..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                          />
                          <Button
                            size="icon"
                            className="rounded-full"
                            disabled={!commentInput || isCreating}
                            onClick={() =>
                              createComment({
                                content: commentInput,
                                mentions: [],
                              })
                            }
                          >
                            {isCreating ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <SendHorizontal size={16} />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
    </div>
  );
}
