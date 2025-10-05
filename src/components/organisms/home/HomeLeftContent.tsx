import CardCurrentActivity from "@/components/molecules/card/CardCurrentActivity";
import CardProfileFeed from "@/components/molecules/card/CardProfileFeed";
import { useSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HomeLeftContent() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-24 hidden md:flex">
      <ScrollArea className="h-[calc(100vh-6rem)] w-full pr-4">
        <div className="flex flex-col gap-6 pb-24">
          <CardProfileFeed />
          <CardCurrentActivity username={session?.user.username as string} />
        </div>
      </ScrollArea>
    </div>
  );
}
