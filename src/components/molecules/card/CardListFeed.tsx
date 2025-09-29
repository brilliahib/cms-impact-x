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
                      src={"/images/profile/profile-2d.png"}
                      alt="Profile Dummy"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col gap-1">
                      <h1 className="font-medium">{feed.user.name}</h1>
                      <span className="text-muted-foreground text-sm">
                        {feed.user.role} | {feed.user.university}
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
