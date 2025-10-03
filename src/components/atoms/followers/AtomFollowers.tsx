import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useFollowUser } from "@/http/follow/follow-user";
import { useUnfollowUser } from "@/http/follow/unfollow-user";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

interface AtomFollowersProps {
  name: string;
  username: string;
  profileImage: string | null;
  role: string | null;
  university: string | null;
  isFollowed: boolean;
  isCurrentUser?: boolean;
  profileUsername?: string;
}

export default function AtomFollowers({
  name,
  username,
  profileImage,
  role,
  university,
  isFollowed,
  isCurrentUser = false,
  profileUsername,
}: AtomFollowersProps) {
  const queryClient = useQueryClient();

  const followMutation = useFollowUser({
    onSuccess: () => {
      toast.success(`Started following ${name}`);
      // Invalidate queries untuk refresh data
      queryClient.invalidateQueries({
        queryKey: ["followers-user", profileUsername],
      });
      queryClient.invalidateQueries({
        queryKey: ["followings-user", profileUsername],
      });
    },
    onError: (error) => {
      toast.error("Failed to follow user");
      console.error("Follow error:", error);
    },
  });

  const unfollowMutation = useUnfollowUser({
    onSuccess: () => {
      toast.success(`Unfollowed ${name}`);
      // Invalidate queries untuk refresh data
      queryClient.invalidateQueries({
        queryKey: ["followers-user", profileUsername],
      });
      queryClient.invalidateQueries({
        queryKey: ["followings-user", profileUsername],
      });
    },
    onError: (error) => {
      toast.error("Failed to unfollow user");
      console.error("Unfollow error:", error);
    },
  });

  const handleFollowToggle = () => {
    if (isFollowed) {
      unfollowMutation.mutate(username);
    } else {
      followMutation.mutate(username);
    }
  };

  const isLoading = followMutation.isPending || unfollowMutation.isPending;

  return (
    <Card className="flex flex-row items-center justify-between gap-2 p-2 text-sm shadow-xs">
      <CardContent className="flex w-full gap-2 p-1">
        <Image
          src={profileImage ?? "/images/profile/profile-2d.png"}
          alt={name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          {isCurrentUser ? (
            <Link href={`/profile`} className="hover:underline">
              <p className="font-medium">
                {name}
                <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                  You
                </span>
              </p>
            </Link>
          ) : (
            <Link href={`/profile/${username}`} className="hover:underline">
              <p className="font-medium">{name}</p>
            </Link>
          )}

          <p className="text-muted-foreground mt-1 line-clamp-1 text-xs">
            <span>{role ?? "No role"}</span> |{" "}
            <span className="font-medium">{university ?? "No university"}</span>
          </p>
        </div>
      </CardContent>
      {!isCurrentUser && (
        <>
          {isFollowed ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  disabled={isLoading}
                >
                  {isLoading ? "..." : "Followed"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0" align="start">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={handleFollowToggle}
                  disabled={isLoading}
                >
                  {isLoading ? "..." : "Stop Following"}
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={handleFollowToggle}
              disabled={isLoading}
            >
              {isLoading ? "..." : "Follow"}
            </Button>
          )}
        </>
      )}
    </Card>
  );
}
