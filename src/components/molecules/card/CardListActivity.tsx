"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Activity } from "@/types/activity/activity";
import SearchInput from "@/components/atoms/search/SearchInput";
import Image from "next/image";
import { buildFromAppURL } from "@/utils/misc";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Separator } from "@/components/ui/separator";

interface CardListActivityProps {
  data?: Activity[];
  isPending?: boolean;
  onSelect?: (activityId: number) => void;
  showSelect?: boolean;
  onTypeChange?: (type: string) => void;
  selectedType?: string;
}

function ActivitySkeleton() {
  return (
    <Card className="mb-4 w-full">
      <CardContent>
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-40" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CardListActivity({
  data,
  isPending,
  onSelect,
  showSelect = true,
  onTypeChange,
  selectedType,
}: CardListActivityProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 🔍 Filter berdasarkan pencarian dan kategori
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((activity) => {
      const matchesSearch = activity.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const categories = Array.isArray(activity.activity_category)
        ? activity.activity_category
        : JSON.parse(activity.activity_category);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) =>
          categories
            .map((c: string) => c.toLowerCase())
            .includes(cat.toLowerCase()),
        );

      const matchesType =
        !selectedType ||
        selectedType === "all" ||
        activity.activity_type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [data, searchTerm, selectedCategories, selectedType]);

  // ✅ Apply filter hanya ketika tombol ditekan
  const handleApplyFilter = () => {
    setSelectedCategories(tempSelected);
  };

  return (
    <Card className="w-full md:flex-1">
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <SearchInput
            placeholder="Search Activity..."
            fullWidth
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
        </div>

        {/* 🎛️ Filter */}
        <div className="flex gap-4">
          {showSelect && (
            <Select
              value={selectedType || "all"}
              onValueChange={(value) =>
                onTypeChange?.(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="competition">Competition</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
              </SelectContent>
            </Select>
          )}
          <MultiSelect
            options={[
              { value: "science", label: "Science & Research" },
              { value: "math", label: "Mathematics" },
              { value: "technology", label: "Technology & Innovation" },
              { value: "engineering", label: "Engineering" },
              { value: "business", label: "Business & Entrepreneurship" },
              { value: "economics", label: "Economics" },
              { value: "law", label: "Law & Debate" },
              { value: "medicine", label: "Medical & Health" },
              { value: "social", label: "Social & Humanities" },
              { value: "arts", label: "Arts & Design" },
              { value: "music", label: "Music & Performance" },
              { value: "literature", label: "Literature & Writing" },
              { value: "sports", label: "Sports & E-Sports" },
              { value: "environment", label: "Environment & Sustainability" },
              { value: "volunteer", label: "Volunteer / Community Service" },
              { value: "competition", label: "General Competition" },
            ]}
            placeholder="Select activity category"
            className="flex-1"
            value={tempSelected}
            onValueChange={(values) => setTempSelected(values)}
          />

          <Button
            variant="outline"
            className="cursor-pointer text-sm"
            onClick={handleApplyFilter}
          >
            Apply Filter
          </Button>
        </div>

        {/* 📋 Daftar Activity */}
        <ScrollArea className="h-[60vh] w-full">
          <div>
            {isPending ? (
              Array.from({ length: 3 }).map((_, i) => (
                <ActivitySkeleton key={i} />
              ))
            ) : filteredData.length > 0 ? (
              filteredData.map((activity) => (
                <Card
                  key={activity.id}
                  className="hover:bg-accent w-full cursor-pointer rounded-none border-none pb-0 shadow-none"
                  onClick={() => onSelect?.(activity.id)}
                >
                  <CardContent>
                    <div className="flex justify-between gap-4">
                      <div className="flex gap-4">
                        <Image
                          src={
                            activity?.user.profile_images
                              ? buildFromAppURL(activity.user.profile_images)
                              : "/images/profile/profile-2d.png"
                          }
                          alt={activity?.user.name ?? "Profile User"}
                          width={50}
                          height={50}
                          className="min-h-[50px] min-w-[50px] rounded-full border object-cover"
                        />
                        <div className="space-y-4">
                          <CardTitle>{activity.title}</CardTitle>
                          <div className="flex flex-row flex-wrap gap-2">
                            <Badge className="capitalize">
                              {activity.activity_type}
                            </Badge>
                            {Array.isArray(activity.activity_category)
                              ? activity.activity_category.map(
                                  (category, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="capitalize"
                                    >
                                      {category}
                                    </Badge>
                                  ),
                                )
                              : JSON.parse(activity.activity_category).map(
                                  (category: string, index: number) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="capitalize"
                                    >
                                      {category}
                                    </Badge>
                                  ),
                                )}
                          </div>
                        </div>
                      </div>
                      <div className="flex h-fit flex-row gap-4">
                        <Badge className="rounded-full bg-green-500/10 text-green-500">
                          {activity.total_participants}/
                          {activity.max_participants}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <Separator className="m-o p-0" />
                </Card>
              ))
            ) : (
              <div className="flex items-center justify-center py-10 text-gray-500">
                No matching activities found.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
