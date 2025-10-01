import FollowingByUsernameWrapper from "@/components/organisms/profile/following/FollowingByUsernameWrapper";

interface FollowingUserPageProps {
  params: Promise<{ username: string }>;
}

export default async function FollowingUserPage({
  params,
}: FollowingUserPageProps) {
  const { username } = await params;
  return (
    <section>
      <FollowingByUsernameWrapper username={username} />
    </section>
  );
}
