import SearchInput from "@/components/atoms/search/SearchInput";
import { SelectActivityCategory } from "@/components/atoms/select/SelectActivityCategory";
import SelectActivityType from "@/components/atoms/select/SelectActivityType";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function CardListActivity() {
  return (
    <Card>
      <CardContent className="space-y-6">
        <SearchInput placeholder="Search Activity..." fullWidth />
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <SelectActivityType />
          </div>
          <div className="flex-1">
            <SelectActivityCategory />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Badge>Project</Badge>
          <Badge variant={"outline"}>Category 1</Badge>
          <Badge variant={"outline"}>Category 1</Badge>
          <Badge variant={"outline"}>Category 1</Badge>
        </div>
        <div className="space-y-0">
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={"/images/profile/profile-2d.png"}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium">
                    Nama Project Lorem ipsum dolor sit amet
                  </h3>
                  <div className="flex flex-row gap-2">
                    <Badge variant={"secondary"}>Category 1</Badge>
                    <Badge variant={"secondary"}>Category 1</Badge>
                  </div>
                </div>
              </div>
              <Badge className="h-fit rounded-full bg-green-500/10 text-green-500">
                3/4
              </Badge>
            </CardContent>
          </Card>
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={"/images/profile/profile-2d.png"}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium">
                    Nama Project Lorem ipsum dolor sit amet
                  </h3>
                  <div className="flex flex-row gap-2">
                    <Badge variant={"secondary"}>Category 1</Badge>
                    <Badge variant={"secondary"}>Category 1</Badge>
                  </div>
                </div>
              </div>
              <Badge className="h-fit rounded-full bg-green-500/10 text-green-500">
                3/4
              </Badge>
            </CardContent>
          </Card>
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={"/images/profile/profile-2d.png"}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium">
                    Nama Project Lorem ipsum dolor sit amet
                  </h3>
                  <div className="flex flex-row gap-2">
                    <Badge variant={"secondary"}>Category 1</Badge>
                    <Badge variant={"secondary"}>Category 1</Badge>
                  </div>
                </div>
              </div>
              <Badge className="h-fit rounded-full bg-green-500/10 text-green-500">
                3/4
              </Badge>
            </CardContent>
          </Card>
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={"/images/profile/profile-2d.png"}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium">
                    Nama Project Lorem ipsum dolor sit amet
                  </h3>
                  <div className="flex flex-row gap-2">
                    <Badge variant={"secondary"}>Category 1</Badge>
                    <Badge variant={"secondary"}>Category 1</Badge>
                  </div>
                </div>
              </div>
              <Badge className="h-fit rounded-full bg-green-500/10 text-green-500">
                3/4
              </Badge>
            </CardContent>
          </Card>
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={"/images/profile/profile-2d.png"}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium">
                    Nama Project Lorem ipsum dolor sit amet
                  </h3>
                  <div className="flex flex-row gap-2">
                    <Badge variant={"secondary"}>Category 1</Badge>
                    <Badge variant={"secondary"}>Category 1</Badge>
                  </div>
                </div>
              </div>
              <Badge className="h-fit rounded-full bg-green-500/10 text-green-500">
                3/4
              </Badge>
            </CardContent>
          </Card>
          <Card className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none">
            <CardContent className="flex justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={"/images/profile/profile-2d.png"}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium">
                    Nama Project Lorem ipsum dolor sit amet
                  </h3>
                  <div className="flex flex-row gap-2">
                    <Badge variant={"secondary"}>Category 1</Badge>
                    <Badge variant={"secondary"}>Category 1</Badge>
                  </div>
                </div>
              </div>
              <Badge className="h-fit rounded-full bg-green-500/10 text-green-500">
                3/4
              </Badge>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
