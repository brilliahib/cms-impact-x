import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Feed } from "@/types/feeds/feed";
import { Ellipsis, MessageCircleMore, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { buildFromAppURL } from "@/utils/misc";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
                <div className="mb-4 border-b pb-4">
                  <h1 className="text-sm leading-6">{feed.content}</h1>
                </div>
                {feed.activity && (
                  <Card className="pt-0">
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
                )}
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <div className="flex cursor-pointer items-center gap-2 text-sm">
                    <ThumbsUp size={18} />
                    Like
                  </div>
                  <div className="flex cursor-pointer items-center gap-2 text-sm">
                    <MessageCircleMore size={18} />
                    Comment
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
    </div>
  );
}
