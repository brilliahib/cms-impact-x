import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function CardPeopleSuggest() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>People You May Know</CardTitle>
        <Button variant={"ghost"} className="text-[#0284C7]">
          See All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={"/images/profile/profile-2d.png"}
              alt="Profile Dummy"
              width={50}
              height={50}
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-sm font-medium">Bagus Tri Atmojo</h1>
              <span className="text-muted-foreground text-sm">
                UI/UX Designer
              </span>
            </div>
            <Button variant={"outline"} size={"sm"}>
              Follow
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={"/images/profile/profile-2d.png"}
              alt="Profile Dummy"
              width={50}
              height={50}
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-sm font-medium">Bagus Tri Atmojo</h1>
              <span className="text-muted-foreground text-sm">
                UI/UX Designer
              </span>
            </div>
            <Button variant={"outline"} size={"sm"}>
              Follow
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={"/images/profile/profile-2d.png"}
              alt="Profile Dummy"
              width={50}
              height={50}
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-sm font-medium">Bagus Tri Atmojo</h1>
              <span className="text-muted-foreground text-sm">
                UI/UX Designer
              </span>
            </div>
            <Button variant={"outline"} size={"sm"}>
              Follow
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
