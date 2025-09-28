import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

export default function CardAuthorActivity() {
  return (
    <Card>
      <CardHeader className="border-b-2 pb-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={"/images/profile/profile-2d.png"}
              alt="Profile Dummy"
              width={50}
              height={50}
            />
            <div className="flex flex-col gap-1">
              <h1 className="font-medium">Bagus Tri Atmojo</h1>
              <span className="text-muted-foreground text-sm">
                UI/UX Designer | Universitas Diponegoro
              </span>
            </div>
          </div>
          <div>
            <Ellipsis />
          </div>
        </div>
      </CardHeader>
      <CardHeader>
        <CardTitle>Joined</CardTitle>
        <CardDescription>
          Participants who have joined your activity
        </CardDescription>
        <div className="mt-4 space-y-4">
          <Card>
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={"/images/profile/profile-2d.png"}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-1 text-sm">
                  <p className="font-semibold">Bagus Tri Atmojo</p>
                  <div className="text-muted-foreground flex flex-row gap-1">
                    <p>UI/UX Designer</p>
                    <span className="opacity-30">|</span>
                    <p>Universitas Diponegoro</p>
                  </div>
                </div>
              </div>
              <div>
                <Ellipsis />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={"/images/profile/profile-2d.png"}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-1 text-sm">
                  <p className="font-semibold">Bagus Tri Atmojo</p>
                  <div className="text-muted-foreground flex flex-row gap-1">
                    <p>UI/UX Designer</p>
                    <span className="opacity-30">|</span>
                    <p>Universitas Diponegoro</p>
                  </div>
                </div>
              </div>
              <div>
                <Ellipsis />
              </div>
            </div>
          </Card>
        </div>
      </CardHeader>
    </Card>
  );
}
