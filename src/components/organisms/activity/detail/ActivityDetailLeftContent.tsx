import CardAuthorActivity from "@/components/molecules/card/CardAuthorActivity";
import { Activity } from "@/types/activity/activity";

interface ActivityDetailLeftContentProps {
  data?: Activity;
  isPending?: boolean;
}

export default function ActivityDetailLeftContent({
  data,
  isPending,
}: ActivityDetailLeftContentProps) {
  return (
    <div className="hidden flex-col gap-6 md:flex">
      <CardAuthorActivity data={data} isPending={isPending} />
    </div>
  );
}
