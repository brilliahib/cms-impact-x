import ActivityByTypeWrapper from "@/components/organisms/activity/types/ActivityByTypeWrapper";

interface ActivityByTypePageProps {
  params: Promise<{ name: string }>;
}

export default async function ActivityByTypePage({
  params,
}: ActivityByTypePageProps) {
  const { name } = await params;

  return (
    <section>
      <ActivityByTypeWrapper name={name} />
    </section>
  );
}
