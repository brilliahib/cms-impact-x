import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function CardProfileFeed() {
  return (
    <div>
      <Card className="w-full overflow-hidden pt-0">
        <div className="relative h-32 w-full md:h-36">
          <Image
            src="/images/profile/bg.jpg"
            alt="background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto -mt-20 flex h-[100px] w-[100px] md:h-[100px] md:w-[100px]">
          <Image
            src="/images/profile/profile.jpg"
            alt="profile"
            fill
            className="rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>
        <CardContent>
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-lg font-semibold">Bagus Tri Atmojo</h1>
            <span className="text-muted-foreground text-sm">
              UI/UX Designer | Universitas Diponegoro
            </span>
            <p className="text-sm text-[#0284C7]">40+ Followers</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
