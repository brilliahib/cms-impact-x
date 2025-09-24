import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const CardProfile = () => {
  return (
    <>
      <Card className="flex w-3/4 flex-row p-4">
        <div>
          <CardTitle className="text-lg">About</CardTitle>
          <CardDescription className="text-sm tracking-wide">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            leo eget felis pretium fringilla. Mauris ullamcorper, metus non
            finibus facilisis, urna lacus dapibus eros, vel consequat erat
            tellus in ante.
          </CardDescription>
        </div>
        <div className="flex flex-row items-center">
          <Image
            src="/images/profile/undip.png"
            width={70}
            height={70}
            alt=""
          />
          <div>
            <h2 className="text-sm font-bold">Universitas Diponegoro</h2>
            <p className="text-xs">Teknik Komptuter</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardProfile;
