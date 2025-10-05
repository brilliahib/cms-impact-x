import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFollowUser } from "@/http/follow/follow-user";
import { User } from "@/types/user/user";
import { buildFromAppURL } from "@/utils/misc";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface CardPeopleSuggestProps {
  data?: User[];
  isPending?: boolean;
}

export default function CardPeopleSuggest({
  data,
  isPending,
}: CardPeopleSuggestProps) {
  const queryClient = useQueryClient();

  const followMutation = useFollowUser({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggest-people"] });
    },
    onError: () => {
      toast.error("Failed to follow this user!");
    },
  });

  return (
    <Card className="shadow-xs">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>People You May Know</CardTitle>
        <Button
          variant={"ghost"}
          className="p-0 text-[#0284C7] hover:bg-transparent hover:text-[#0284C7] hover:underline 2xl:px-4 2xl:py-2"
        >
          <Link href={"/suggest"} className="text-xs">
            See All
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {isPending ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full border" />
                <div className="flex flex-1 flex-col gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-20 rounded" />
              </div>
            ))
          ) : data && data.length > 0 ? (
            data.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="flex flex-1 items-center gap-3">
                  <Image
                    src={
                      user?.profile?.profile_images
                        ? buildFromAppURL(user.profile.profile_images)
                        : "/images/profile/profile-2d.png"
                    }
                    alt={user?.name ?? `${user.first_name} ${user.last_name}`}
                    width={50}
                    height={50}
                    className="min-h-[50px] min-w-[50px] rounded-full border object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/profile/${user.username}`}
                      className="hover:underline"
                    >
                      <h1 className="line-clamp-1 text-sm font-medium">
                        {user.first_name} {user.last_name}
                      </h1>
                    </Link>
                    {user.profile && user.profile.university && (
                      <span className="text-muted-foreground line-clamp-1 text-sm">
                        {user.profile.university}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => followMutation.mutate(user.username)}
                  className="text-xs 2xl:text-sm"
                >
                  Follow
                </Button>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              No suggestions available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
