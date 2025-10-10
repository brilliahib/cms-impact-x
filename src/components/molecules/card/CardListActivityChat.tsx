import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityChat } from "@/types/activity/chat/activity-chat";
import { buildFromAppURL } from "@/utils/misc";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface CardListActivityChatProps {
  data?: ActivityChat[];
  isPending: boolean;
}

export default function CardListActivityChat({
  data,
  isPending,
}: CardListActivityChatProps) {
  if (isPending) {
    return (
      <>
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-[50px] w-[50px] rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2 w-20" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <div className="space-y-6">
      {data?.map((chat) => (
        <Card key={chat.id}>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={
                    chat.user.profile.profile_images
                      ? buildFromAppURL(chat.user.profile.profile_images)
                      : "/images/profile/profile-2d.png"
                  }
                  alt={chat.user.name ?? "Profile User"}
                  width={50}
                  height={50}
                  className="min-h-[50px] min-w-[50px] rounded-full border object-cover"
                />
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/profile/${chat.user.username}`}
                    className="hover:underline"
                  >
                    <h1 className="font-medium">{chat.user.name}</h1>
                  </Link>
                  <span className="text-muted-foreground text-sm">
                    {chat.user &&
                    (chat.user.profile.role || chat.user.profile.university) ? (
                      <>
                        {chat.user.profile.role ?? ""}
                        {chat.user.profile.role && chat.user.profile.university
                          ? " | "
                          : ""}
                        {chat.user.profile.university ?? ""}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                  <p className="text-muted-foreground text-xs">
                    {format(new Date(chat.created_at), "d MMMM yyyy", {
                      locale: id,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <p className="whitespace-pre-wrap">{chat.message}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
