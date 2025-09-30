import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock3, Ellipsis, MapPin, UsersRound } from "lucide-react";
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
      <CardHeader className="border-b-2 pb-4">
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
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex flex-row items-center gap-2">
              <CardTitle className="text-xl">
                Lorem ipsum dolor sit amet, lorem ipsum dolor
              </CardTitle>
              <Badge
                variant={"default"}
                className="bg-green-100 text-lg text-green-700"
              >
                3/4
              </Badge>
            </div>
            <CardDescription className="text-muted-foreground py-2 font-medium">
              Posted on: 26 Sept 2025
            </CardDescription>
            <div className="flex w-3/4 flex-wrap gap-2">
              <Badge>Project</Badge>
              <Badge variant={"secondary"}>Category 1</Badge>
              <Badge variant={"secondary"}>Category 1</Badge>
              <Badge variant={"secondary"}>Category 1</Badge>
              <Badge variant={"secondary"}>Category 1</Badge>
              <Badge variant={"secondary"}>Category 1</Badge>
              <Badge variant={"secondary"}>Category 1</Badge>
              <Badge variant={"secondary"}>Category 1</Badge>
              <Badge variant={"secondary"}>Category 1</Badge>
            </div>
          </div>
          <div>
            <Image
              src={"/images/activity/detail_activity.jpg"}
              alt="detail"
              className="rounded-lg"
              width={300}
              height={300}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between gap-4">
          <Card className="flex-1 p-4">
            <div className="flex gap-1">
              <MapPin />
              <h1>Location</h1>
            </div>
            <p>Tembalang, Semarang, Indonesia</p>
          </Card>

          <Card className="flex-1 p-4">
            <div className="flex gap-1">
              <Clock3 />
              <h1>Duration</h1>
            </div>
            <p>26 Sept - 05 Okt 2025</p>
          </Card>

          <Card className="flex-1 p-4">
            <div className="flex gap-1">
              <UsersRound />
              <h1>Max Participants</h1>
            </div>
            <p>4 People</p>
          </Card>
        </div>
        <div className="my-4">
          <h1 className="pb-2 font-bold">Description</h1>
          <p className="text-justify text-pretty">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque dui nisi, accumsan et magna quis, imperdiet congue
            dolor. Nam felis diam, vestibulum faucibus molestie at, bibendum
            vitae leo. In a bibendum nibh. Maecenas maximus nisl at aliquet
            tempor. Vestibulum sem felis, porta ut ex in, pharetra lacinia leo.
            Curabitur pulvinar massa mi, vitae maximus nisi blandit vel. Sed
            porta consectetur massa, quis ornare eros vehicula sit amet.
            Pellentesque dapibus a justo sed aliquet. Mauris leo diam,
            vestibulum in ante eu, tempus finibus nisi.
          </p>
        </div>
        <div className="flex flex-row">
          <div className="flex-1">
            <h1 className="font-bold">Requirements</h1>
            <ul className="ml-6 list-inside list-disc">
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
            </ul>
          </div>
          <div className="flex-1">
            <h1 className="font-bold">Benefits</h1>
            <ul className="ml-6 list-inside list-disc">
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
