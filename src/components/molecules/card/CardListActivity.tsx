"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { Activity } from "@/types/activity/activity";

interface CardListActivityProps {
  data?: Activity[];
  isPending?: boolean;
  onSelect?: (activity: Activity) => void;
}

function ActivitySkeleton() {
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

export default function CardListActivity({
  data,
  isPending,
  onSelect,
}: CardListActivityProps) {
  return (
    <div className="w-full space-y-6">
      {isPending
        ? Array.from({ length: 3 }).map((_, i) => <ActivitySkeleton key={i} />)
        : data?.map((activity) => (
            <Card
              key={activity.id}
              className="w-full cursor-pointer hover:border-blue-500"
              onClick={() => onSelect?.(activity)} // 🔥 kirim ke parent
            >
              <CardHeader className="flex items-start justify-between">
                <div className="space-y-4">
                  <Link
                    href={`/activity/${activity.id}`}
                    className="mb-4 block hover:underline"
                    onClick={(e) => e.stopPropagation()} // biar klik link ga trigger onSelect
                  >
                    <CardTitle>{activity.title}</CardTitle>
                  </Link>
                  <div className="flex flex-row gap-2">
                    <Badge className="capitalize">
                      {activity.activity_type}
                    </Badge>
                    {Array.isArray(activity.activity_category)
                      ? activity.activity_category.map((category, index) => (
                          <Badge
                            key={index}
                            variant={"outline"}
                            className="capitalize"
                          >
                            {category}
                          </Badge>
                        ))
                      : JSON.parse(activity.activity_category).map(
                          (category: string, index: number) => (
                            <Badge
                              key={index}
                              variant={"outline"}
                              className="capitalize"
                            >
                              {category}
                            </Badge>
                          ),
                        )}
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Badge className="bg-green-500/10 text-green-500">
                    {activity.total_participants}/{activity.max_participants}
                  </Badge>
                  <Ellipsis />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Posted on:{" "}
                  {format(new Date(activity.created_at), "d MMMM yyyy", {
                    locale: id,
                  })}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant={"outline"}>See Details</Button>
              </CardFooter>
            </Card>
          ))}
    </div>
  );
}
