import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import Image from "next/image";

const CardProfile = () => {
  return (
    <Card className="w-full overflow-hidden p-0 md:w-3/4">
      {/* Background */}
      <div className="relative h-32 w-full md:h-44">
        <Image
          src="/images/profile/bg.jpg"
          alt="background"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-16 ml-4 flex h-[100px] w-[100px] justify-start rounded-full md:-mt-24 md:h-[150px] md:w-[150px]">
        <Image
          src="/images/profile/profile.jpg"
          alt="profile"
          fill
          className="rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>

      <div className="-mt-0 flex flex-col items-start gap-4 px-6 md:-mt-24 md:flex-row md:items-center md:gap-6">
        <div className="md:ml-40">
          <h2 className="text-lg font-bold md:text-xl">John Doe</h2>
          <div className="flex flex-row gap-4 text-sm font-medium text-gray-900/60 md:text-base">
            <p>UI/UX Designer</p>
            <span className="opacity-30">|</span>
            <p className="text-sky-600">40+ Followers</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 md:ml-auto md:w-auto md:flex-row">
          <Button className="w-full md:w-auto">Follow</Button>
          <Button variant={"outline"}>
            <Download />
            Download Portofolio
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 p-6 md:flex-row">
        <div className="flex-1">
          <CardTitle className="pb-2 text-base md:pb-4 md:text-lg">
            About
          </CardTitle>
          <CardDescription className="mb-4 text-justify text-xs tracking-wider md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
            labore deserunt. Cupiditate odio assumenda consectetur perferendis
            et velit facere quidem voluptas ut voluptatibus ad nesciunt esse
            fuga, fugiat exercitationem unde debitis quisquam sed amet,
            quibusdam nobis veniam. Exercitationem, adipisci minima quam
            incidunt tempora provident voluptate porro, atque, ducimus vitae et!
          </CardDescription>
        </div>

        <div className="flex basis-full flex-row items-center gap-2 md:basis-1/5">
          <Image
            src="/images/profile/undip.png"
            width={50}
            height={50}
            alt="undip"
            className="rounded-md"
          />
          <div className="flex flex-col">
            <h2 className="text-xs font-semibold md:text-sm">
              Universitas Diponegoro
            </h2>
            <p className="text-xs">S1 Teknik Komputer</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardProfile;
