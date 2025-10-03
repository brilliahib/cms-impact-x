import FollowsByUsernameWrapper from "@/components/organisms/profile/following/FollowsByUsernameWrapper";

interface FollowsUserPageProps {
  params: Promise<{ username: string }>;
}

export default async function FollowsUserPage({
  params,
}: FollowsUserPageProps) {
  const { username } = await params;
  return (
    <section>
      <FollowsByUsernameWrapper username={username} />
    </section>
  );
}
