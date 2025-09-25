"use client";

import { useState } from "react";

import CardContactInfo from "@/components/molecules/card/CardContactInfo";
import CardCurrentActivity from "@/components/molecules/card/CardCurrentActivity";
import CardListPost from "@/components/molecules/card/CardListPost";
import { Button } from "@/components/ui/button";

export default function ProfileScrollContent() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      <div className="my-4 hidden w-1/3 md:block">
        <CardContactInfo />
        <CardCurrentActivity />
      </div>
      <div className="my-4 flex w-full flex-col gap-6 md:w-2/3">
        <div className="flex flex-row gap-4">
          {!selected ? (
            <span
              onClick={() => setSelected("Activity")}
              className="cursor-pointer text-sm text-gray-600 hover:underline"
            >
              Select Activity
            </span>
          ) : (
            <>
              <Button
                size="sm"
                variant={selected === "Feeds" ? "outline" : "ghost"}
                onClick={() => setSelected("Feeds")}
              >
                Feeds
              </Button>
              <Button
                size="sm"
                variant={selected === "Activity" ? "outline" : "ghost"}
                onClick={() => setSelected("Activity")}
              >
                Activity
              </Button>
            </>
          )}
        </div>
        <CardListPost />
        <CardListPost />
        <CardListPost />
        <CardListPost />
        <CardListPost />
        <CardListPost />
        <CardListPost />
      </div>
    </div>
  );
}
