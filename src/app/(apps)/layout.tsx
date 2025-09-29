import Navbar from "@/components/organisms/navbar/Navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";

export default async function AppsLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Navbar session={session!} />
      <main className="pad-x-xl my-24">{children}</main>
    </div>
  );
}
