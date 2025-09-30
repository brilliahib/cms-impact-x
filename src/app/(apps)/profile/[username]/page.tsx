import ProfileByUsernameWrapper from "@/components/organisms/profile/username/ProfileUsernameWrapper";

interface ProfileUserPageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfileUserPage({
  params,
}: ProfileUserPageProps) {
  const { username } = await params;

  return (
    <section>
      <ProfileByUsernameWrapper username={username} />
    </section>
  );
}
