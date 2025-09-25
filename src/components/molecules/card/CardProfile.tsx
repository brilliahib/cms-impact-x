import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const CardProfile = () => {
  return (
    <Card className="w-3/4 overflow-hidden p-0">
      <div className="relative h-40 w-full">
        <Image
          src="/images/profile/bg.jpg"
          alt="background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative -mt-16 mb-4 ml-4 flex h-[150px] w-[150px] justify-start rounded-full">
        <Image
          src="/images/profile/profile.jpg"
          alt="profile"
          fill
          className="rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>

      <div className="flex flex-row px-6 pb-6">
        <div>
          <CardTitle className="text-lg">About</CardTitle>
          <CardDescription className="mb-4 text-sm tracking-wide">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            leo eget felis pretium fringilla. Mauris ullamcorper, metus non
            finibus facilisis, urna lacus dapibus eros, vel consequat erat
            tellus in ante.
          </CardDescription>
        </div>

        <div className="flex flex-row items-center gap-3">
          <Image
            src="/images/profile/undip.png"
            width={80}
            height={80}
            alt="undip"
            className="rounded-md"
          />
          <div>
            <h2 className="text-sm font-bold">Universitas Diponegoro</h2>
            <p className="text-xs">Teknik Komputer</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardProfile;
