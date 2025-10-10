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
import { useState, useMemo, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialCategories = searchParams.get("category")?.split(",") ?? [];

  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelected, setTempSelected] = useState<string[]>(initialCategories);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);

  // 🔁 Jika URL berubah (misalnya dari navigasi manual), sinkronkan ulang kategori
  useEffect(() => {
    const fromUrl = searchParams.get("category")?.split(",") ?? [];
    setSelectedCategories(fromUrl);
    setTempSelected(fromUrl);
  }, [searchParams]);

  // 🔍 Filtering
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

  // 🧩 Update URL dan state filter
  const handleApplyFilter = () => {
    setSelectedCategories(tempSelected);

    const params = new URLSearchParams(searchParams.toString());
    if (tempSelected.length > 0) {
      params.set("category", tempSelected.join(","));
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Card className="w-full md:max-w-[40%] md:basis-[40%]">
      <CardContent>
        <div className="space-y-2">
          <div className="flex w-full items-center gap-2">
            <SearchInput
              placeholder="Search Activity..."
              fullWidth
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="filters" className="border-none">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Filter Options
              </AccordionTrigger>

              <AccordionContent>
                <div className="flex flex-col items-end gap-3 md:gap-4">
                  <div className="flex w-full gap-2">
                    {/* Type */}
                    {showSelect && (
                      <Select
                        value={selectedType || "all"}
                        onValueChange={(value) =>
                          onTypeChange?.(value === "all" ? "" : value)
                        }
                      >
                        <SelectTrigger className="w-full md:basis-1/3">
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                          <SelectItem value="competition">
                            Competition
                          </SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    {/* Category */}
                    <div className="w-full md:basis-2/3">
                      <MultiSelect
                        options={[
                          { value: "science", label: "Science & Research" },
                          { value: "math", label: "Mathematics" },
                          {
                            value: "technology",
                            label: "Technology & Innovation",
                          },
                          { value: "engineering", label: "Engineering" },
                          {
                            value: "business",
                            label: "Business & Entrepreneurship",
                          },
                          { value: "economics", label: "Economics" },
                          { value: "law", label: "Law & Debate" },
                          { value: "medicine", label: "Medical & Health" },
                          { value: "social", label: "Social & Humanities" },
                          { value: "arts", label: "Arts & Design" },
                          { value: "music", label: "Music & Performance" },
                          {
                            value: "literature",
                            label: "Literature & Writing",
                          },
                          { value: "sports", label: "Sports & E-Sports" },
                          {
                            value: "environment",
                            label: "Environment & Sustainability",
                          },
                          {
                            value: "volunteer",
                            label: "Volunteer / Community Service",
                          },
                          {
                            value: "competition",
                            label: "General Competition",
                          },
                        ]}
                        placeholder="Select activity category"
                        value={tempSelected}
                        onValueChange={(values) => setTempSelected(values)}
                      />
                    </div>
                  </div>

                  {/* Apply */}
                  <Button
                    variant="secondary"
                    onClick={handleApplyFilter}
                    className="w-fit whitespace-nowrap"
                  >
                    Apply Filter
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* 📋 List */}
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
                  className="hover:bg-accent w-full cursor-pointer rounded-none border-none p-0 shadow-none"
                  onClick={() => onSelect?.(activity.id)}
                >
                  <CardContent className="px-2">
                    <div className="flex justify-between px-0 py-4 2xl:py-6">
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
                          className="h-fit min-h-[50px] min-w-[50px] rounded-full border object-cover"
                        />
                        <div className="space-y-4">
                          <CardTitle>{activity.title}</CardTitle>
                          <div className="flex flex-row flex-wrap gap-2">
                            <Link
                              href={`/activity?type=${encodeURIComponent(activity.activity_type.toLowerCase())}`}
                              passHref
                            >
                              <Badge className="capitalize">
                                {activity.activity_type}
                              </Badge>
                            </Link>
                            {(Array.isArray(activity.activity_category)
                              ? activity.activity_category
                              : JSON.parse(activity.activity_category)
                            ).map((category: string, index: number) => (
                              <Link
                                key={index}
                                href={`/activity?category=${encodeURIComponent(category.toLowerCase())}`}
                                passHref
                              >
                                <Badge
                                  variant="secondary"
                                  className="cursor-pointer capitalize"
                                >
                                  {category}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex h-fit flex-row gap-4">
                        {activity ? (
                          <Badge
                            variant="default"
                            className={`rounded-full px-3 text-sm font-semibold transition-colors ${
                              (activity.total_participants ?? 0) >=
                              (activity.max_participants ?? 0)
                                ? "bg-gray-200 text-gray-600"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {(activity.total_participants ?? 0) >=
                            (activity.max_participants ?? 0)
                              ? "Full"
                              : `${activity.total_participants ?? 0}/${activity.max_participants ?? 0}`}
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="rounded-full bg-gray-100 px-2 text-gray-500"
                          >
                            Loading...
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Separator />
                  </CardContent>
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
