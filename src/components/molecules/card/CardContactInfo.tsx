import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileUser } from "@/types/profile/profile-user";
import { Link } from "lucide-react";

interface CardContactInfoProps {
  data?: ProfileUser;
  isPending?: boolean;
}

function CardContactInfoSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Contact Info</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-4 w-48" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function CardContactInfo({
  data,
  isPending,
}: CardContactInfoProps) {
  if (isPending) {
    return <CardContactInfoSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Contact Info</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {data?.contact_info.map((info, i) => (
          <div key={i} className="flex items-center gap-4">
            <Link className="h-5 w-5 shrink-0" />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sky-600">
              {info}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
