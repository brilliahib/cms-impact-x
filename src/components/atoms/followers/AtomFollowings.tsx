import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AtomFollowers() {
  return (
    <>
      <Card className="flex flex-row items-center justify-between gap-2 p-2 text-sm shadow-xs">
        <CardContent className="flex w-full gap-2 p-1">
          <Image
            src={"/images/profile/profile-2d.png"}
            alt="Profile"
            width={40}
            height={40}
          />
          <div className="space-y-1">
            <p className="font-medium">Bagus Tri Atmojo</p>
            <p className="text-muted-foreground line-clamp-1 text-xs">
              <span>UI/UX Designer</span>|
              <span className="font-medium">Universitas Diponegoro</span>
            </p>
          </div>
        </CardContent>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"secondary"} size={"sm"} className={"text-xs"}>
              Followed
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="start">
            <Button variant={"ghost"} size={"sm"} className={"text-xs"}>
              Stop Following
            </Button>
          </PopoverContent>
        </Popover>
      </Card>
    </>
  );
}
