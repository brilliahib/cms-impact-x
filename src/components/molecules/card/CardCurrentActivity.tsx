import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function CardCurrentActivity() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Current Activity</CardTitle>
        <Button
          variant={"ghost"}
          className="text-[#0284C7] hover:bg-transparent hover:text-[#0284C7] hover:underline"
          size={"sm"}
        >
          <Link href={"/activity"}>See Details</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div>
          <Card className="gap-0 p-2">
            <CardHeader className="flex justify-between border-b p-2 pb-4!">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-sm">Nama Competition</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={"secondary"}>Category 1</Badge>
                  <Badge variant={"secondary"}>Category 1</Badge>
                </div>
              </div>
              <div>
                <Badge variant={"secondary"} className="text-muted-foreground">
                  4/4
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-2">
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
                </div>
                <div className="flex justify-center">
                  <h1 className="text-sm text-[#0284C7]">+2 more</h1>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
