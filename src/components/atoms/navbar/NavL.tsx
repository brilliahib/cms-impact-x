import Image from "next/image";
import Link from "next/link";

export default function NavL() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/images/logo/logo.png"}
              alt="ImpactX"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
