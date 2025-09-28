import SearchInput from "@/components/atoms/search/SearchInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Image from "next/image";

export default function CardListDetailActivity() {
  return (
    <Card>
      <CardContent className="space-y-6">
        <SearchInput placeholder="Search People..." fullWidth />
        <div className="space-y-0">
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                  <Image
                    src={"/images/profile/profile-2d.png"}
                    alt="Profile Image"
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col gap-1 text-xs">
                    <p className="font-medium">Bagus Tri Atmojo</p>
                    <div className="flex flex-row gap-1">
                      <p>UI/UX Designer</p>
                      <span className="opacity-30">|</span>
                      <p>Universitas Diponegoro</p>
                    </div>
                  </div>
                </div>
                <div className="ml-14 flex flex-row gap-2">
                  <Button variant={"default"} size={"sm"}>
                    <Check />
                    Approve
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="text-red-600"
                  >
                    <X color="red" />
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                  <Image
                    src={"/images/profile/profile-2d.png"}
                    alt="Profile Image"
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col gap-1 text-xs">
                    <p className="font-medium">Bagus Tri Atmojo</p>
                    <div className="flex flex-row gap-1">
                      <p>UI/UX Designer</p>
                      <span className="opacity-30">|</span>
                      <p>Universitas Diponegoro</p>
                    </div>
                  </div>
                </div>
                <div className="ml-14 flex flex-row gap-2">
                  <Button variant={"default"} size={"sm"}>
                    <Check />
                    Approve
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="text-red-600"
                  >
                    <X color="red" />
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                  <Image
                    src={"/images/profile/profile-2d.png"}
                    alt="Profile Image"
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col gap-1 text-xs">
                    <p className="font-medium">Bagus Tri Atmojo</p>
                    <div className="flex flex-row gap-1">
                      <p>UI/UX Designer</p>
                      <span className="opacity-30">|</span>
                      <p>Universitas Diponegoro</p>
                    </div>
                  </div>
                </div>
                <div className="ml-14 flex flex-row gap-2">
                  <Button variant={"default"} size={"sm"}>
                    <Check />
                    Approve
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="text-red-600"
                  >
                    <X color="red" />
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                  <Image
                    src={"/images/profile/profile-2d.png"}
                    alt="Profile Image"
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col gap-1 text-xs">
                    <p className="font-medium">Bagus Tri Atmojo</p>
                    <div className="flex flex-row gap-1">
                      <p>UI/UX Designer</p>
                      <span className="opacity-30">|</span>
                      <p>Universitas Diponegoro</p>
                    </div>
                  </div>
                </div>
                <div className="ml-14 flex flex-row gap-2">
                  <Button variant={"default"} size={"sm"}>
                    <Check />
                    Approve
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="text-red-600"
                  >
                    <X color="red" />
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
