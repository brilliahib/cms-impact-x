import CardCurrentActivity from "@/components/molecules/card/CardCurrentActivity";
import CardProfileFeed from "@/components/molecules/card/CardProfileFeed";
import { useSession } from "next-auth/react";

export default function HomeLeftContent() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-24 flex hidden flex-col gap-6 md:flex">
      <CardProfileFeed />
      <CardCurrentActivity username={session?.user.username as string} />
    </div>
  );
}
