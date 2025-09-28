import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function CardTopPost() {
  return (
    <Card>
      <CardHeader>
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
              <p className="text-muted-foreground text-xs">24 Sept 2025</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-sm leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec leo
          eget felis pretium fringilla. Mauris ullamcorper, metus non finibus
          facilisis, urna lacus dapibus eros, vel consequat erat tellus in ante.
        </h1>
      </CardContent>
    </Card>
  );
}
