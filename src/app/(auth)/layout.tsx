import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AppsLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/");
  return <>{children}</>;
}
