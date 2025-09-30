import CardCurrentActivity from "@/components/molecules/card/CardCurrentActivity";
import CardProfileFeed from "@/components/molecules/card/CardProfileFeed";
import { useGetAllActivityUser } from "@/http/activity/get-all-activity-user";
import { useSession } from "next-auth/react";

export default function HomeLeftContent() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllActivityUser(
    session?.user.username as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="sticky top-24 flex hidden flex-col gap-6 md:flex">
      <CardProfileFeed />
      <CardCurrentActivity username={session?.user.username as string} />
    </div>
  );
}
