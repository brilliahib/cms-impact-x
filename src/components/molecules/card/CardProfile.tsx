import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import Image from "next/image";

const CardProfile = () => {
  return (
    <Card className="w-3/4 overflow-hidden p-0">
      <div className="relative h-44 w-full">
        <Image
          src="/images/profile/bg.jpg"
          alt="background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative -mt-24 ml-4 flex h-[150px] w-[150px] justify-start rounded-full">
        <Image
          src="/images/profile/profile.jpg"
          alt="profile"
          fill
          className="rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>

      <div className="-mt-24 flex flex-row items-center gap-6 px-6">
        <div className="ml-40">
          <h2 className="font-bold">John Doe</h2>
          <p className="font-medium text-gray-900/60">UI/UX Designer</p>
        </div>

        <div className="ml-auto flex gap-2">
          <Button>Follow</Button>
          <Button className="bg-white text-black shadow-sm shadow-black hover:bg-gray-300">
            <Download />
            Download Portofolio
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-6 p-6">
        {/* About Section */}
        <div className="flex-1">
          <CardTitle className="pb-4 text-lg">About</CardTitle>
          <CardDescription className="mb-4 tracking-wider">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
            aperiam eius magnam consequuntur nisi fuga reprehenderit maxime cum
            possimus doloremque voluptatum expedita sequi nihil exercitationem
            alias, non adipisci sapiente. Tenetur neque cupiditate optio
            recusandae modi nam. Amet doloribus impedit reprehenderit ex quas,
            excepturi, ipsum doloremque praesentium consequatur esse beatae
            accusamus.
          </CardDescription>
        </div>

        <div className="flex basis-1/5 flex-row items-center gap-1">
          <Image
            src="/images/profile/undip.png"
            width={60}
            height={60}
            alt="undip"
            className="rounded-md"
          />
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">Universitas Diponegoro</h2>
            <p className="text-xs">S1 Teknik Komputer</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardProfile;
