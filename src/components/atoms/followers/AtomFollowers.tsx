import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AtomFollowers() {
  return (
    <>
      <div className="flex flex-row items-center gap-2 text-sm">
        <Image
          src={"/images/profile/profile-2d.png"}
          alt="Profile"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <p className="font-medium">Bagus Tri Atmojo</p>
          <div className="flex flex-row gap-1">
            <p>UI/UX Designer</p>
            <span className="opacity-30">|</span>
            <p className="font-medium">Universitas Diponegoro</p>
          </div>
        </div>
        <Button variant={"outline"}>Follow</Button>
      </div>
    </>
  );
}
