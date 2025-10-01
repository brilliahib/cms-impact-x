import ActivityDetailWrapper from "@/components/organisms/activity/detail/ActivityDetailWrapper";

interface ActivityDetailPageProps {
  params: Promise<{ id: number }>;
}

export default async function ActivityDetailPage({
  params,
}: ActivityDetailPageProps) {
  const { id } = await params;

  return (
    <section>
      <ActivityDetailWrapper id={id} />
    </section>
  );
}
